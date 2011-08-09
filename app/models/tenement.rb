class Tenement < ActiveRecord::Base
  belongs_to :assesment
  has_many :sites, :dependent => :destroy
  has_many :map_sites, :class_name => "Site", :finder_sql =>
            'SELECT *, x(ST_PointOnSurface(the_geom)) as lng, 
              y(ST_PointOnSurface(the_geom)) as lat, 
              ST_AsGeoJSON(the_geom,6,0) as geojson
              FROM sites s
              WHERE s.tenement_id=#{id}
              ORDER BY s.id'
              
  acts_as_geom :the_geom => :polygon

  validates_presence_of :query_area_km2


  MAX_SHP_FILESIZE_MB = 2
  MAX_POLYGON_AREA_KM2 = 10000

  def self.create_from_geojson (geojson,assesment)
    polygon_wkt = GeomHelper.geojson_to_wkt geojson
    validate_max_area polygon_wkt
        wkb = ActiveRecord::Base.connection.execute("SELECT ST_GeomFromText('#{polygon_wkt}')")
        assesment.tenements.create :the_geom =>  wkb.getvalue(0,0)
  end

  def self.validate_max_area polygon_wkt, srid = GeoRuby::SimpleFeatures::DEFAULT_SRID
    area = ActiveRecord::Base.connection.select_value("SELECT (ST_Area(ST_Transform(ST_GeomFromText('#{polygon_wkt}',#{srid}),954009)))").to_i
    area = area / 1000000 . to_i
    if area <= Tenement::MAX_POLYGON_AREA_KM2
      return true
    end
    raise "Your polygon is too large (#{area} km2), please limit its area to #{Tenement::MAX_POLYGON_AREA_KM2} km2."
    redirect_to root_url
  end

  # call ppe web service, get results and store locally
  def analysePolygon(geojson, data_sources = ["protected_areas"])
    self.query_area_km2 = 0
    self.query_area_carbon_kg = 0
    self.save

    #convert geojson to wkt
    wkt = GeomHelper.geojson_to_wkt geojson
    query = [{:id => self.id, :the_geom => wkt}].to_json

    data_sources.each { |source|
      case source
        when "coral"
          url = "http://localhost:4567/marine_search/coral"
          field_setter = "query_area_coral_km2="
        when "mangroves"
          url = "http://localhost:4567/marine_search/mangroves"
          field_setter = "query_area_mangrove_km2="
        when "sea_grass"
          url = ""
          field_setter = "query_area_sea_grass_km2="
        else
          next
      end

      res = nil
      begin
        res = JSON.parse Net::HTTP.post_form(URI.parse(url),:data => query).body
      rescue
        next
      end
      next unless res
      if res.include? "error"
        msg = "Error fetching data from #{source} data source: " + res["error"]
        puts msg
        logger.error msg
        next
      end

      val = 0
      res["results"].each{|item|val += item["overlapped_area"].to_f}
      self.send field_setter, val
      self.save
    }

    if data_sources.include?( "protected_areas" )
      ok = true
      begin
        # call API
        url = "http://protectedplanet.net/api2/geo_searches"
        res = Net::HTTP.post_form(URI.parse(url),:data => query).body
        res = JSON.parse res
      rescue
        ok = false
      end

      if ok
        # populate DB with results
        debugger
        res["results"].each do |item|
          # This will be returned multiple times, but... it seems to be the only way to get it, other than calculating
          # locally. (Would that be so bad?.)
          self.query_area_km2 = item["query_area_km2"].to_f
          self.query_area_carbon_kg = item["query_area_carbon_kg"].to_f
          self.save

          item["protected_areas"].each do |s|
            #ds   = s['data_standard']
            #wkt  = ds["GEOM"]
            site = Site.create :tenement_id                    => id,
                            :wdpaid                         => s['wdpaid'],
                            :image                          => s['image'],
                            :encoded_polyline_cache         => s['epl'],
                            :data_standard                  => s['data_standard'],
                            :protected_carbon_kg            => s['protected_carbon_kg'],
                            :protected_area_km2             => s['protected_area_km2'],
                            :query_area_protected_km2       => s['query_area_protected_km2'],
                            :query_area_protected_carbon_kg => s['query_area_protected_carbon_kg']
              sql = "UPDATE sites SET the_geom=ST_GeomFromText('#{s['simple_geom']}') where id=#{site.id}"
              Site.connection.execute sql
          end
        end
      end
    end
  end

  def image
    Site.first(:select => "image", :conditions => "image IS NOT NULL AND tenement_id=#{id}").try(:image)
  end

  def total_query_area_protected
    res = Site.sum(:query_area_protected_km2, :conditions => "tenement_id = #{id}")
    puts res.to_s
    res
  end

  def percentage_protected
    total_query_area_protected.out_of query_area_km2
  end
  
  # Encoded polyline of the PA geometry optimised for static map display
  # If not cached, generate 
  # @return [String] encoded polyline 
  def epl  width = 197, height=124
    epl = encoded_polyline_cache ? encoded_polyline_cache : set_epl
    epl.gsub("?size=197x124", "?size=#{width}x#{height}")
  end    
  
  # Calls generation of optimum encoded polyline & saves to DB
  # @return [String] Optimal Encoded Polyline
  def set_epl
    epl = optimum_epl
    sql = "UPDATE tenements SET encoded_polyline_cache = '#{epl}' WHERE id=#{self.id}"
    self.connection.update sql
    epl
  end
  
  # Generate an Encoded Polyline geom targetting a specific length
  # 
  # Used in related PA maps on PA show page:
  #
  # 1. Google Static Maps are generated with a GET request
  # 2. Google will overlay an EPL polygon if passed in the GET request
  # 3. E6+ has a max GET URL length of 2083 chars (http://support.microsoft.com/kb/208427)
  # 4. We therefore need to generate an EPL < 2083. 
  #
  # Algorithm is very slow. Starts with agressive simplification, gets less agressive.
  #
  # TODO: replace with recursive binary search
  # TODO: Fix bug where can exit with false on first loop if epl length > max
  #
  # @param [Integer] epl_max_size sets target EPL length
  # @param [Float] tolerance sets initial starting point for simplification
  # @return [String] Best Encoded Polyline within epl_max_size length 
  def optimum_epl max = 1700, tolerance = 0.1
    last_epl = false
    epl = nil
    10.times do |i|
      epl = generate_epl(tolerance)
      
      # Exit loop      
      # 28 == basic string length from generate_epl
      if epl.length > max || (epl.length == last_epl.length if last_epl && epl.length != 29)
        return last_epl 
      else  
        last_epl = epl
        tolerance = tolerance / 10.0 #DECREASE SIMPLIFICATION BY FACTOR OF TEN
      end  
    end
    epl
  end

  # Generate an Encoded Polyline + Google Static Maps URL for PA
  #
  # TODO: Tidy and separate
  # @param [Float] tolerance sets level of polygon simplification
  # @return [String] URL params for a Google static map image request 
  def generate_epl tolerance = 0.001
    e = EncodedPolylineEncoder.new
    enc_string = "?size=197x124&maptype=terrain"
    each_poly_string = "&path=fillcolor:0xED671E66|color:0xED671EFF|weight:2|enc:"
    geoms = JSON.parse(self.simple_poly(tolerance))["coordinates"][0]    
    unless geoms.nil? || geoms.flatten.empty?
      geoms.each do |poly|
        unless poly.flatten.empty?
          poly.map!{|x| [x[1],x[0]]} #FLIP FLOP X/Y
          enc = e.encode(poly)[:points]
          enc_string << each_poly_string << enc
        end
      end
    end  
    enc_string
  end

  # Generate a simplified polygon in GeoJSON format
  # 
  # (see ProtectedArea#find_simple_geojson)
  def simple_poly tolerance=0.001, precision = 4, bbox = false     
    self.class.find_simple_geojson self.id, tolerance, precision, bbox
  end
  
  # Generate a simplified polygon in GeoJSON format
  # 
  # @param [Integer] id of the protected area to get geometry for
  # @param [Float] tolerance sets level of polygon simplification
  # @param [Integer] precision sets number of dp for coordinates
  # @param [Boolean] bbox turns on or off bounding box inclusion
  # @return [String] GeoJSON string of simplified geometry  
  def self.find_simple_geojson id=nil, tolerance=0.0005, precision = 6, bbox = true    
    return false if id.nil?
    self.find_by_sql("SELECT ST_AsGeoJSON(ST_Multi(ST_Simplify(the_geom,#{tolerance})),#{precision},#{bbox ? 1 : 0}) as json from tenements WHERE id = #{id}").first.try(:json)
  end
end
