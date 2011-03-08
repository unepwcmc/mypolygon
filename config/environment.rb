# Load the rails application
require File.expand_path('../application', __FILE__)

#RESET DEFAULT SRID THAT GEORUBY USES (GEM DEFAULTS TO -1)
GeoRuby::SimpleFeatures::DEFAULT_SRID = 4326
MAPS_KEY = "ABQIAAAA-O3c-Om9OcvXMOJXreXHAxQGj0PqsCtxKvarsoS-iqLdqZSKfxS27kJqGZajBjvuzOBLizi931BUow"


# Initialize the rails application
Mypolygon::Application.initialize!
def pie_colors
  [ "377EB8","E44544", "4DAF4A", "984EA3", "FF7F00" ]
end    
