class Site < ActiveRecord::Base
  belongs_to :tenement
  acts_as_geom :the_geom => :polygon

  DESCRIPTION_URL = "http://www.biodiversitya-z.org/areas/describe.json"

  def percent_affected
    ((query_area_protected_km2 / protected_area_km2) *100).floor.to_i
  end
  
  # Encoded polyline of the PA geometry optimised for static map display
  # If not cached, generate 
  # @return [String] encoded polyline 
  def epl  width = 197, height=124
    epl = encoded_polyline_cache
    epl.gsub("?size=197x124", "?size=#{width}x#{height}")
  end

  def atoz_data area_name
    uri = URI.parse DESCRIPTION_URL + "?name=" + area_name
    data = Net::HTTP.get( uri )
    res = JSON.parse data
    [res["id"], res["strap_line"]]
  end
end
