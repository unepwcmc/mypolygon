# This file is auto-generated from the current state of the database. Instead of editing this file, 
# please use the migrations feature of Active Record to incrementally modify your database, and
# then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your database schema. If you need
# to create the application database on another system, you should be using db:schema:load, not running
# all the migrations from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20100916204226) do

  create_table "assesments", :force => true do |t|
    t.column "user_id", :integer
    t.column "file_name", :string
    t.column "state", :string
    t.column "delete_at", :datetime
    t.column "created_at", :datetime
    t.column "updated_at", :datetime
  end

# Could not dump table "geography_columns" because of following StandardError
#   Unknown type 'name' for column 'f_table_catalog' /Users/andren/projects/mypolygon/vendor/gems/postgis_adapter-0.7.2/lib/postgis_adapter/common_spatial_adapter.rb:52:in `table'/Users/andren/projects/mypolygon/vendor/gems/postgis_adapter-0.7.2/lib/postgis_adapter/common_spatial_adapter.rb:50:in `each'/Users/andren/projects/mypolygon/vendor/gems/postgis_adapter-0.7.2/lib/postgis_adapter/common_spatial_adapter.rb:50:in `table'/Users/andren/.rvm/gems/ruby-1.8.7-p334/gems/activerecord-2.3.5/lib/active_record/schema_dumper.rb:72:in `tables'/Users/andren/.rvm/gems/ruby-1.8.7-p334/gems/activerecord-2.3.5/lib/active_record/schema_dumper.rb:63:in `each'/Users/andren/.rvm/gems/ruby-1.8.7-p334/gems/activerecord-2.3.5/lib/active_record/schema_dumper.rb:63:in `tables'/Users/andren/.rvm/gems/ruby-1.8.7-p334/gems/activerecord-2.3.5/lib/active_record/schema_dumper.rb:25:in `dump'/Users/andren/.rvm/gems/ruby-1.8.7-p334/gems/activerecord-2.3.5/lib/active_record/schema_dumper.rb:19:in `dump'/Users/andren/.rvm/gems/ruby-1.8.7-p334/gems/rails-2.3.5/lib/tasks/databases.rake:260/Users/andren/.rvm/gems/ruby-1.8.7-p334/gems/rails-2.3.5/lib/tasks/databases.rake:259:in `open'/Users/andren/.rvm/gems/ruby-1.8.7-p334/gems/rails-2.3.5/lib/tasks/databases.rake:259/Users/andren/.rvm/gems/ruby-1.8.7-p334/gems/rake-0.8.7/lib/rake.rb:636:in `call'/Users/andren/.rvm/gems/ruby-1.8.7-p334/gems/rake-0.8.7/lib/rake.rb:636:in `execute'/Users/andren/.rvm/gems/ruby-1.8.7-p334/gems/rake-0.8.7/lib/rake.rb:631:in `each'/Users/andren/.rvm/gems/ruby-1.8.7-p334/gems/rake-0.8.7/lib/rake.rb:631:in `execute'/Users/andren/.rvm/gems/ruby-1.8.7-p334/gems/rake-0.8.7/lib/rake.rb:597:in `invoke_with_call_chain'/Users/andren/.rvm/rubies/ruby-1.8.7-p334/lib/ruby/1.8/monitor.rb:242:in `synchronize'/Users/andren/.rvm/gems/ruby-1.8.7-p334/gems/rake-0.8.7/lib/rake.rb:590:in `invoke_with_call_chain'/Users/andren/.rvm/gems/ruby-1.8.7-p334/gems/rake-0.8.7/lib/rake.rb:583:in `invoke'/Users/andren/.rvm/gems/ruby-1.8.7-p334/gems/rails-2.3.5/lib/tasks/databases.rake:117/Users/andren/.rvm/gems/ruby-1.8.7-p334/gems/rake-0.8.7/lib/rake.rb:636:in `call'/Users/andren/.rvm/gems/ruby-1.8.7-p334/gems/rake-0.8.7/lib/rake.rb:636:in `execute'/Users/andren/.rvm/gems/ruby-1.8.7-p334/gems/rake-0.8.7/lib/rake.rb:631:in `each'/Users/andren/.rvm/gems/ruby-1.8.7-p334/gems/rake-0.8.7/lib/rake.rb:631:in `execute'/Users/andren/.rvm/gems/ruby-1.8.7-p334/gems/rake-0.8.7/lib/rake.rb:597:in `invoke_with_call_chain'/Users/andren/.rvm/rubies/ruby-1.8.7-p334/lib/ruby/1.8/monitor.rb:242:in `synchronize'/Users/andren/.rvm/gems/ruby-1.8.7-p334/gems/rake-0.8.7/lib/rake.rb:590:in `invoke_with_call_chain'/Users/andren/.rvm/gems/ruby-1.8.7-p334/gems/rake-0.8.7/lib/rake.rb:583:in `invoke'/Users/andren/.rvm/gems/ruby-1.8.7-p334/gems/rake-0.8.7/lib/rake.rb:2051:in `invoke_task'/Users/andren/.rvm/gems/ruby-1.8.7-p334/gems/rake-0.8.7/lib/rake.rb:2029:in `top_level'/Users/andren/.rvm/gems/ruby-1.8.7-p334/gems/rake-0.8.7/lib/rake.rb:2029:in `each'/Users/andren/.rvm/gems/ruby-1.8.7-p334/gems/rake-0.8.7/lib/rake.rb:2029:in `top_level'/Users/andren/.rvm/gems/ruby-1.8.7-p334/gems/rake-0.8.7/lib/rake.rb:2068:in `standard_exception_handling'/Users/andren/.rvm/gems/ruby-1.8.7-p334/gems/rake-0.8.7/lib/rake.rb:2023:in `top_level'/Users/andren/.rvm/gems/ruby-1.8.7-p334/gems/rake-0.8.7/lib/rake.rb:2001:in `run'/Users/andren/.rvm/gems/ruby-1.8.7-p334/gems/rake-0.8.7/lib/rake.rb:2068:in `standard_exception_handling'/Users/andren/.rvm/gems/ruby-1.8.7-p334/gems/rake-0.8.7/lib/rake.rb:1998:in `run'/Users/andren/.rvm/gems/ruby-1.8.7-p334/gems/rake-0.8.7/bin/rake:31/Users/andren/.rvm/gems/ruby-1.8.7-p334/bin/rake:19:in `load'/Users/andren/.rvm/gems/ruby-1.8.7-p334/bin/rake:19

  create_table "sites", :force => true do |t|
    t.column "name", :text
    t.column "tenement_id", :integer
    t.column "wdpaid", :integer
    t.column "image", :string
    t.column "data_standard", :text
    t.column "protected_carbon_kg", :float
    t.column "protected_area_km2", :float
    t.column "query_area_protected_km2", :float
    t.column "query_area_protected_carbon_kg", :float
    t.column "encoded_polyline_cache", :text
    t.column "created_at", :datetime
    t.column "updated_at", :datetime
    t.column "the_geom", :multi_polygon, :srid => 4326
  end

  create_table "tenements", :force => true do |t|
    t.column "assesment_id", :integer
    t.column "attribute_data", :text
    t.column "query_area_km2", :float
    t.column "query_area_carbon_kg", :float
    t.column "encoded_polyline_cache", :text
    t.column "created_at", :datetime
    t.column "updated_at", :datetime
    t.column "the_geom", :multi_polygon, :srid => 4326
  end

  create_table "users", :force => true do |t|
    t.column "created_at", :datetime
    t.column "updated_at", :datetime
  end

end
