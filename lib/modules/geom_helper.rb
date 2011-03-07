module GeomHelper #from https://gist.github.com/411915
  def self.geojson_to_wkt geojson

    #PARSE GEOJSON INTO NICE RING STRINGS
    json = JSON.parse geojson
    polys = json["coordinates"]
    polygons = []
    polys.each do |poly|
      rings = []
      poly.each do |ring|
        r = ring.inject([]){|acc,x| acc << x.join(" ")}.join(",")
        rings << "(#{r})"
      end
      polygons << rings
    end

    #WRITE OUT TO WKT
    wkt = polygons.inject([]){|acc,x| acc << "(#{x.join(",")})"}
    "MULTIPOLYGON(#{wkt.join(",")})"
  end
end