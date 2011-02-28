module GeoRuby
  module SimpleFeatures

    #Contains the bounding box of a geometry
    class Envelope
      attr_accessor :lower_corner, :upper_corner
      attr_accessor :srid, :with_z, :zoom

      #Creates a enw Envelope with +lower_corner+ as the first element of the corners array and +upper_corner+ as the second element
      def initialize(srid = @@default_srid, with_z = false)
        @srid = srid
        @with_z = with_z
      end

      #Merges the argument with the current evelope
      def extend!(envelope)
        lower_corner.x = [lower_corner.x,envelope.lower_corner.x].min
        lower_corner.y = [lower_corner.y,envelope.lower_corner.y].min
        upper_corner.x = [upper_corner.x,envelope.upper_corner.x].max
        upper_corner.y = [upper_corner.y,envelope.upper_corner.y].max
        self
      end

      #Merges the argument with the current evelope and sends back a new
      #envelope without changing the current one
      def extend(envelope)
        e = Envelope.from_points([Point.from_x_y(lower_corner.x,lower_corner.y),
                          Point.from_x_y(upper_corner.x,upper_corner.y)],srid,with_z)
        e.extend!(envelope)
        e
      end
#  def bounding_box(markers)
#    max_lat, max_lon, min_lat, min_lon = -Float::MAX, -Float::MAX, Float::MAX, Float::MAX
#    markers.each do |marker|
#      coord = marker.point
#      max_lat = coord.lat if coord.lat > max_lat
#      min_lat = coord.lat if coord.lat < min_lat
#      max_lon = coord.lng if coord.lng > max_lon
#      min_lon = coord.lng if coord.lng < min_lon
#    end
#    min_point = Point.from_x_y(min_lat,min_lon)
#    max_point = Point.from_x_y(max_lat,max_lon)

#    end
#    centrelat = (max_lat + min_lat)/2
#    centrelng = (max_lon + min_lon)/2
#    # logger.info("distance[#{distance}],zoom[#{zoom}]")
#    #return GLatLngBounds.new(GLatLng.new(min_point),GLatLng.new(max_point)), [centrelat,centrelng], zoom
#    return [centrelat,centrelng], zoom

      #Sends back the center of the envelope
      def center
        Point.from_x_y((lower_corner.x + upper_corner.x)/2,(lower_corner.y + upper_corner.y)/2)
      end

      #Zoom level
      def zoom
        distance = lower_corner.spherical_distance(upper_corner)/10000
        @zoom = case distance
        when 150..9000  then 5
        when 80..149    then 6
        when 50..79     then 7
        when 20..49     then 8
        when 10..19     then 9
        when 5..9       then 10
        else 13
        end
      end

      #Tests the equality of line strings
      def ==(other_envelope)
        if other_envelope.class != self.class
          false
        else
          upper_corner == other_envelope.upper_corner and lower_corner == other_envelope.lower_corner
        end
      end

      #georss serialization: Dialect can be passed as option <tt>:dialect</tt> and set to <tt>:simple</tt> (default)
      #<tt>:w3cgeo</tt> or <tt>:gml</tt>. Options <tt>:featuretypetag
      def as_georss(options = {})
        dialect= options[:dialect] || :simple
        case(dialect)
        when :simple
          geom_attr = ""
          geom_attr += " featuretypetag=\"#{options[:featuretypetag]}\"" if options[:featuretypetag]
          geom_attr += " relationshiptag=\"#{options[:relationshiptag]}\"" if options[:relationshiptag]
          geom_attr += " floor=\"#{options[:floor]}\"" if options[:floor]
          geom_attr += " radius=\"#{options[:radius]}\"" if options[:radius]
          geom_attr += " elev=\"#{options[:elev]}\"" if options[:elev]

          georss_simple_representation(options.merge(:geom_attr => geom_attr))
        when :w3cgeo
          georss_w3cgeo_representation(options)
        when :gml
          georss_gml_representation(options)
        end
      end

       #georss simple representation
      def georss_simple_representation(options = {}) #:nodoc:
        georss_ns = options[:georss_ns] || "georss"
        geom_attr = options[:geom_attr]
        "<#{georss_ns}:box#{geom_attr}>#{lower_corner.y} #{lower_corner.x} #{upper_corner.y} #{upper_corner.x}</#{georss_ns}:box>\n"
      end

      #georss w3c representation : outputs the first point of the line
      def georss_w3cgeo_representation(options = {}) #:nodoc:
        w3cgeo_ns = options[:w3cgeo_ns] || "geo"
        point = self.center
        "<#{w3cgeo_ns}:lat>#{point.y}</#{w3cgeo_ns}:lat>\n<#{w3cgeo_ns}:long>#{point.x}</#{w3cgeo_ns}:long>\n"
      end

      #georss gml representation
      def georss_gml_representation(options = {}) #:nodoc:
        georss_ns = options[:georss_ns] || "georss"
        gml_ns = options[:gml_ns] || "gml"
        result = "<#{georss_ns}:where>\n<#{gml_ns}:Envelope>\n"
        result += "<#{gml_ns}:LowerCorner>" + "#{lower_corner.y} #{lower_corner.x}" + "</#{gml_ns}:LowerCorner>"
        result += "<#{gml_ns}:UpperCorner>" + "#{upper_corner.y} #{upper_corner.x}" + "</#{gml_ns}:UpperCorner>"
        result += "</#{gml_ns}:Envelope>\n</#{georss_ns}:where>\n"
      end

      #Sends back a latlonaltbox
      def as_kml(options = {})
        geom_data = ""
        geom_data = "<altitudeMode>#{options[:altitude_mode]}</altitudeMode>\n" if options[:altitude_mode]

        allow_z = with_z && (!options[:altitude_mode].nil?) && options[:atitude_mode] != "clampToGround"

        kml_representation(options.merge(:geom_data => geom_data,:allow_z => allow_z))
      end

      def kml_representation(options = {})#:nodoc:
        result = "<LatLonAltBox>\n"
        result += options[:geom_data]
        result += "<north>#{upper_corner.y}</north>\n"
        result += "<south>#{lower_corner.y}</south>\n"
        result += "<east>#{upper_corner.x}</east>\n"
        result += "<west>#{lower_corner.x}</west>\n"

        if with_z
          result += "<minAltitude>#{lower_corner.z}</minAltitude>"
          result += "<maxAltitude>#{upper_corner.z}</maxAltitude>"
        end

        result += "</LatLonAltBox>\n"
      end

      #Creates a new envelope. Accept an array of 2 points as argument
      def self.from_points(points,srid=@@default_srid,with_z=false)
        raise "Not an array" unless points.class == Array
        e = Envelope.new(srid,with_z)
        e.lower_corner, e.upper_corner = points
        e
      end

      #Creates a new envelope. Accept a sequence of point coordinates as argument : ((x,y),(x,y))
      def self.from_coordinates(points,srid=@@default_srid,with_z=false)
        e = Envelope.new(srid,with_z)
        e.lower_corner, e.upper_corner =  points.collect{|point_coords| Point.from_coordinates(point_coords,srid,with_z)}
        e
      end

    end
  end
end
