class CreateLists < ActiveRecord::Migration[5.1]
  def change
    create_table :lists do |t|
      t.string :title, null: false
      t.text :description
      t.boolean :active, default: true

      t.timestamps
    end
  end
end
