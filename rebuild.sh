rake db:drop:all
rake db:create:all
rake db:migrate
rake proteus:import_us


#
# ADD THIS TO YOUR POSTGIS INSTALLATION TO ENABLE DISTANCE CALCS
#
#INSERT into spatial_ref_sys (srid, auth_name, auth_srid, proj4text, srtext) values ( 97, 'sr-org', 7, '+proj=moll +lon_0=0 +x_0=0 +y_0=0 +ellps=WGS84 +units=m +no_defs ', 'PROJCS["unnamed",GEOGCS["WGS 84",DATUM["unknown",SPHEROID["WGS84",6378137,298.257223563]],PRIMEM["Greenwich",0],UNIT["degree",0.0174532925199433]],PROJECTION["Mollweide"],PARAMETER["central_meridian",0],PARAMETER["false_easting",0],PARAMETER["false_northing",0]]');