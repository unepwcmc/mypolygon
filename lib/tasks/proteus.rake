#THESE TASKS IMPORT DATA FROM THE WDPA SHAPEFILE
namespace :proteus do 
      
  desc "import data from shapefile direct to postgis"
  task :import_us => :environment do
    begin
      sh "rm db/wdpa.sql"
    rescue
    end

    begin
      sh "shp2pgsql -W LATIN1 -c -i -I -s 4326 lib/data/shp/WDPA_clusterofSites_US.shp public.pas > db/wdpa.sql"
    sh "psql -h localhost -d proteus_tool_development -U postgres < db/wdpa.sql"
      sh "rm db/wdpa.sql"
    rescue
      throw "ensure that WDPA_clusterofSites_US.shp and associated files are inside your lib/data/shp directory."
    end
  end
    
    
  desc "import all WDPA data from shapefile direct to postgis"
  task :import_all => :environment do
    begin
      sh "rm db/wdpa.sql"
    rescue
    end
    
    begin
      sh "shp2pgsql -W LATIN1 -c -i -I -s 4326 lib/data/shp/WDPApol2009.shp public.pas > db/wdpa.sql"
      sh "psql -h localhost -d proteus_tool_development -U postgres < db/wdpa.sql"
      sh "rm db/wdpa.sql"
    rescue
      throw "ensure that WDPApol2009.shp and associated files are inside your lib/data/shp directory. you can download them here: http://wdpa.s3.amazonaws.com/WDPApol2009_1.zip"
    end
  end
     
  desc "import all WDPA data from shapefile direct to postgis"
  task :import_all_EC2 => :environment do
    begin
      sh "rm db/wdpa.sql"
    rescue
    end
    
    begin
      sh "shp2pgsql -W LATIN1 -c -i -I -s 4326 lib/data/shp/WDPApol2009.shp public.pas > db/wdpa.sql"
      sh "psql -h 10.245.86.6 -d proteus_tool_production -U postgres < db/wdpa.sql"
      sh "rm db/wdpa.sql"
    rescue
      throw "ensure that WDPApol2009.shp and associated files are inside your lib/data/shp directory. you can download them here: http://wdpa.s3.amazonaws.com/WDPApol2009_1.zip"
    end
  end      
        
    
   
  #################
  # This particular task is a bit of a pain to run
  #
  # In order to run it, you must:
  # * commit all changes to git to date. You are about to trash your local codebase 
  #   in the quest for pretty diagramz.
  # * have Railroad gem installed with graphiz (http://github.com/bryanlarsen/railroad)
  # * comment out the AR inheritance, and all code in data_import.rb model class file
  # * run rake ppe:doc:diagram:models
  # * wait for a weird crash
  # * check your doc directory for the nice model.pdf
  # * undo all your comments from above
  # * git add .
  # * git commit -a -m "updated nice diagrams"
  #
  #
  # I REALLY need to package all this up into a simple rake task...
  namespace :doc do
    namespace :diagram do
      
      desc "Fancy model diagrams in /doc"
      task :models do
        sh "railroad -i -l -a -m -M | dot -Tpdf | sed 's/font-size:14.00/font-size:11.00/g' > doc/models.pdf"
      end
      
      desc "Fancy controller diagrams in /doc"
      task :controllers do
        sh "railroad -i -l -C | neato -Tpdf | sed 's/font-size:14.00/font-size:11.00/g' > doc/controllers.pdf"
      end
    end
    
    desc "model AND Controller diagrams in /doc"
    task :diagrams => %w(diagram:models diagram:controllers)
  end
end
