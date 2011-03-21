class AssesmentsController < ApplicationController
  layout 'base_layout', :except => 'index'
  
  def index
    if params[:base]
      @assesment = Assesment.find params[:base]
    else
      @assesment = Assesment.new
    end
  end

  
  def create
    begin
      file_name = params[:assesment][:shape].original_filename

      #test file ending
      if !file_name.ends_with? ".zip"
        flash[:notice] = "You must import a zip file"
        redirect_to root_url
        return
      end

      #GENERATE INDIVIDUAL FOLDER
      directory_name = Digest::SHA1.hexdigest("#{Time.now.usec}#{file_name}")
      directory = "#{Rails.root}/tmp/shape_uploads/#{directory_name}"

      #BUILD FOLDER IF NOT THERE
      FileUtils.mkdir_p directory

      #create the total file path to save file
      path = File.join(directory, file_name)

      # write the file
      File.open(path, "wb") { |f| f.write(params[:assesment][:shape].read) }

      #Crack open the zip
      Zip::ZipFile.open(path) do |zip_file|
        zip_file.each do |f|
          real_file_name = f.name.split("/").last
          file_path = File.join(directory, real_file_name)
          zip_file.extract(f, file_path)
        end
      end

      #open the shape files and read em in
      debugger
      Dir.new(directory).each do |f|
        if f.ends_with? ".shp"
          #CREATE ASSESSMENT
          @assesment ||= Assesment.create(:file_name => file_name)

          #READ IN AND CREATE TENEMENTS
          GeoRuby::Shp4r::ShpFile.open(File.join(directory,f)) do |shp|
            shp.each do |shape|
              @assesment.tenements.create :the_geom => shape.geometry, :attribute_data => shape.data
            end
          end
        end
      end

      #WE WOULD NORMALLY ADD TO USER HERE, BUT TEMP IS ADD TO SESSION

      #cleanup files
      FileUtils.rm_rf directory

      # Query API
      #@assesment.analyse # let's postpone analysis, since we're allowing user to review this polygon before continuing.

      if @assesment
        flash[:notice] = "analysis complete"
      end

      redirect_to assesments_path(:base => @assesment.id)

    rescue Exception => e
      msg = "File couldn't be uploaded: #{e.inspect}"
      Rails.logger.fatal msg
      redirect_to root_url
    end        
  end

  def createFromPolygon
   #CREATE ASSESSMENT
    @assesment ||= Assesment.create()

    #READ IN AND CREATE TENEMENTS
    tenement = Tenement.create_from_geojson(params[:data],@assesment)

    tenement.analysePolygon(params[:data])
    render :json => @assesment.as_json
  end
    
  def show
    @a = Assesment.find(params[:id]) #.includes(:tenements => :sites)
    
    # percent protected to non protected
    protected_area = @a.tenements.inject(0){|sum,tenement|sum+tenement.sites.sum("query_area_protected_km2")}
    total_area     = @a.tenements.sum(:query_area_km2)
    @percent_protected = protected_area.out_of total_area

    @map_json = @a.map_tenements.map {|t|
          {:id          => t.id,
           :aid         => @a.id,
           :name        => "polygon #{t.id}",
           :local_name  => "#{(t.percentage_protected * 100).floor.to_i}% protection",
           :x           => t.lng,
           :y           => t.lat,
           :the_geom    => JSON.parse(t.geojson),
           :pois        => 0,
           :image       => Gchart.pie(:data => [t.percentage_protected, 1-t.percentage_protected],
                         :size => "150x150", :background => "ffffff", :custom => "chco=#{pie_colors.join("|")}").html_safe}
      }.to_json

    respond_to do |wants|
      wants.html
      wants.csv do
        
        require "csv"
        if CSV.const_defined? :Reader
          # This first part of the if is for rails2/ruby1.8, and can be removed.
          require 'fastercsv'
          csv_string = FasterCSV.generate do |csv|
            # header row
            csv << ["tenement_id", "wdpa_site_code", "pa_name", "iucn_cat", "designation", "tenement_i_km2", "tenement_i_C" ]

            # data rows
            @a.tenements.each do |t|
              t.sites.each do |s|
                d = YAML.load(s.data_standard)
                csv << [t.id, s.wdpaid, d["NAME"].to_s, d["IUCNCAT"].to_s,d["DESIG"].to_s, s.query_area_protected_km2, s.query_area_protected_carbon_kg ]
              end
            end
          end
        else
          csv_string = CSV.generate do |csv|
            # header row
            csv << ["tenement_id", "wdpa_site_code", "pa_name", "iucn_cat", "designation", "tenement_i_km2", "tenement_i_C"]

            # data rows
            @a.tenements.each do |t|
              t.sites.each do |s|
                d = YAML.load(s.data_standard)
                csv << [t.id, s.wdpaid, d["NAME"].to_s, d["IUCNCAT"].to_s,d["DESIG"].to_s, s.query_area_protected_km2, s.query_area_protected_carbon_kg ]
              end
            end
          end

        end
        

        # send it to the browsah
        send_data csv_string,
                 :type => 'text/csv; charset=UTF-8; header=present',
                 :disposition => "attachment; filename=tenement_analysis.csv"
      end
    end
  end
  
  
  def json
    @a = Assesment.find(params[:id])
    return_array = []
    @a.tenements.each do |t|
      json_hash = {}
      json_hash[:id] = t.id
      json_hash[:geom] = JSON.parse t.as_geo_json(6,1)
      return_array << json_hash
    end
      
    render :json => return_array.to_json        
  end
  
  def destroy
    a = Assesment.find(params[:id])  
    if a.destroy
      flash[:notice] = "analysis deleted"
    end
    redirect_to root_url
  end
end
