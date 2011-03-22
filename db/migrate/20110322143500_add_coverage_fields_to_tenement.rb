class AddCoverageFieldsToTenement < ActiveRecord::Migration
  def self.up
    change_table :tenements do |t|
      t.float :query_area_coral_km2, :null => true
      t.float :query_area_mangrove_km2, :null => true
      t.float :query_area_sea_grass_km2, :null => true
    end
  end

  def self.down
    remove_column :query_area_coral_km2
    remove_column :query_area_mangrove_km2
    remove_column :query_area_sea_grass_km2
  end
end
