class CreateTenements < ActiveRecord::Migration
  def self.up
    create_table :tenements do |t|
      t.integer :assesment_id
      t.multi_polygon :the_geom, :srid => 4326, :with_z => false
      t.text  :attribute_data
      t.float :query_area_km2
      t.float :query_area_carbon_kg
      t.text :encoded_polyline_cache
      t.timestamps
    end
  end

  def self.down
    drop_table :tenements
  end
end
