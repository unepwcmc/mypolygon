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
