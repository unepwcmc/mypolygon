#THESE TASKS IMPORT DATA FROM THE WDPA SHAPEFILE
namespace :bootstrap do
      
  desc "add SRID 954009 to db, to allow calculation of areas"
  task :srid => :environment do
    srid = ActiveRecord::Base.connection.select_value("select srid from spatial_ref_sys where srid=954009 LIMIT 1")
    if srid == "954009"
      puts "SRID 954009 already exists, no need to add."
    else
      puts "adding srid 954009 to db..."
      sql = <<EOF
-- http://postgis.refractions.net/pipermail/postgis-users/2010-February/025901.html
INSERT INTO spatial_ref_sys (srid, auth_name, auth_srid, proj4text, srtext)
VALUES ( 954009, 'esri', 54009, '+proj=moll +lon_0=0 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ',
'PROJCS["World_Mollweide", GEOGCS["GCS_WGS_1984",DATUM["WGS_1984",SPHEROID["WGS_1984",6378137,298.257223563]],
PRIMEM["Greenwich",0],UNIT["Degree",0.017453292519943295]],PROJECTION["Mollweide"],PARAMETER["False_Easting",0],
PARAMETER["False_Northing",0],PARAMETER["Central_Meridian",0],UNIT["Meter",1],AUTHORITY["EPSG","54009"]]')
EOF
      ActiveRecord::Base.connection.execute(sql)
      puts"done"
    end
  end
end
