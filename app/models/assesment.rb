class Assesment < ActiveRecord::Base
  belongs_to :user
  has_many :tenements, :dependent => :destroy
  has_many :api_tenements, :class_name => "Tenement", :finder_sql =>
            'SELECT t.id, ST_AsText(t.the_geom) as x_wkt ' +
            'FROM tenements t ' +
            'WHERE t.assesment_id = #{id} ' +
            'ORDER BY t.id'
  has_many :map_tenements, :class_name => "Tenement", :finder_sql =>
            'SELECT *, x(ST_PointOnSurface(the_geom)) as lng, 
              y(ST_PointOnSurface(the_geom)) as lat, 
              ST_AsGeoJSON(the_geom,6,0) as geojson
              FROM tenements t
              WHERE t.assesment_id=#{id}
              ORDER BY t.id'          
  
  # call ppe web service, get results and store locally
  def analyse    
    conn = Site.connection
    
    # build up data structure for the API request
    data = api_tenements.map{|x| {:id => x.id, :the_geom => x.x_wkt}}
    
    # call API
    url = "http://ppe:ppe@stage-www.tinypla.net/api2/geo_searches"
    
    res = JSON.parse Net::HTTP.post_form(URI.parse(url),:data => data.to_json).body
    
    # populate DB with results
    res["results"].each do |res|
      t = Tenement.find res["id"]
      t.query_area_km2 = res["query_area_km2"]
      t.query_area_carbon_kg = res["query_area_carbon_kg"]
      t.save
      
      res["protected_areas"].each do |s|
        if !s["is_point"]
          
          site = Site.create :tenement_id                    => t.id,
                          :name                           => s['name'],
                          :wdpaid                         => s['wdpaid'],
                          :image                          => s['image'],
                          :data_standard                  => s['data_standard'],
                          :protected_carbon_kg            => s['protected_carbon_kg'],
                          :protected_area_km2             => s['protected_area_km2'],
                          :query_area_protected_km2       => s['query_area_protected_km2'],
                          :query_area_protected_carbon_kg => s['query_area_protected_carbon_kg'], 
                          :encoded_polyline_cache         => s['epl']
          sql = "UPDATE sites SET the_geom=ST_GeomFromText('#{s['simple_geom']}') where id=#{site.id}"                                                          
          Site.connection.execute sql
        end                  
      end      
    end    
  end  
end
