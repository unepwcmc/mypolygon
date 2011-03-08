class AddNameToSite < ActiveRecord::Migration
  def self.up
    change_table :sites do |t|
      t.text :name
    end
  end

  def self.down
    remove_column :name
  end
end
