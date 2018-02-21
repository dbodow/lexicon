class CreateWordRequestCaches < ActiveRecord::Migration[5.1]
  def change
    create_table :word_request_caches do |t|
      t.string :query, null: false
      t.integer :user_id, null: false

      t.timestamps
    end
    add_index :word_request_caches, [:user_id, :query], unique: true
  end
end
