class CreateLists < ActiveRecord::Migration[5.1]
  def change
    create_table :lists do |t|
      t.string :title, null: false
      t.text :description
      t.boolean :active, default: true

      t.timestamps
    end

    create_table :listwords do |t|
      t.integer :list_id, null: false
      t.integer :word_id, null: false

      t.timestamps
    end

    add_index :listwords, [:list_id, :word_id], unique: true

    create_table :userlists do |t|
      t.integer :user_id, null: false
      t.integer :list_id, null: false

      t.timestamps
    end

    add_index :userlists, [:user_id, :list_id], unique: true
  end
end
