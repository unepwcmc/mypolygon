class Assesment < ActiveRecord::Base
  belongs_to :user
  has_many :tenements, :dependent => :destroy
  has_many :api_tenements, :class_name => "Tenement", :finder_sql =>
            'SELECT t.id, ST_AsText(t.the_geom) as x_wkt ' +
            'FROM tenements t ' +
            'WHERE t.assesment_id = #{id} ' +
            'ORDER BY t.id'
  
  # call ppe web service, get results and store locally
  def analyse    
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
        ds   = s['data_standard']
        wkt  = ds["GEOM"]
        conn = Site.connection
        s = Site.create :tenement_id                    => t.id,
                        :wdpaid                         => s['wdpaid'],
                        :image                          => s['image'],
                        :encoded_polyline_cache         => s['epl'],
                        :data_standard                  => s['data_standard'],
                        :protected_carbon_kg            => s['protected_carbon_kg'],
                        :protected_area_km2             => s['protected_area_km2'],
                        :query_area_protected_km2       => s['query_area_protected_km2'],
                        :query_area_protected_carbon_kg => s['query_area_protected_carbon_kg']        
      end      
    end    
  end  
end
