class Site < ActiveRecord::Base
  belongs_to :tenement
  acts_as_geom :the_geom => :polygon
  
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
    
end
