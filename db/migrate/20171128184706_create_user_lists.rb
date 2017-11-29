class CreateUserLists < ActiveRecord::Migration[5.1]
  def change
    create_table :user_lists do |t|
      t.integer :user_id, null: false
      t.integer :list_id, null: false

      t.timestamps
    end

    add_index :user_lists, [:user_id, :list_id], unique: true
  end
end
