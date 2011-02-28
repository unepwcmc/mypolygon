class CreateAssesments < ActiveRecord::Migration
  def self.up
    create_table :assesments do |t|
      t.integer  :user_id
      t.string   :file_name
      t.string   :state
      t.datetime :delete_at
      t.timestamps
    end
  end

  def self.down
    drop_table :assesments
  end
end
