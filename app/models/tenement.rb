class Tenement < ActiveRecord::Base
  belongs_to :assesment
  has_many :sites, :dependent => :destroy
  acts_as_geom :the_geom => :polygon  
  
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
