# Load the rails application
require File.expand_path('../application', __FILE__)

#RESET DEFAULT SRID THAT GEORUBY USES (GEM DEFAULTS TO -1)
GeoRuby::SimpleFeatures::DEFAULT_SRID = 4326
MAPS_KEY = "ABQIAAAA-O3c-Om9OcvXMOJXreXHAxQGj0PqsCtxKvarsoS-iqLdqZSKfxS27kJqGZajBjvuzOBLizi931BUow"


# Initialize the rails application
Mypolygon::Application.initialize!
