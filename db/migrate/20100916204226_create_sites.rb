class CreateSites < ActiveRecord::Migration
  def self.up
    create_table :sites do |t|
      t.text :name
      t.integer :tenement_id
      t.integer :wdpaid
      t.string :image
      t.text :data_standard
      t.float :protected_carbon_kg
      t.float :protected_area_km2
      t.float :query_area_protected_km2
      t.float :query_area_protected_carbon_kg
      t.text :encoded_polyline_cache
      t.multi_polygon :the_geom, :srid => 4326, :with_z => false
      t.timestamps
    end
  end

  def self.down
    drop_table :sites
  end
end
