class CreateDefinitions < ActiveRecord::Migration[5.1]
  def change
    create_table :definitions do |t|
      t.string :definition, null: false
      t.string :pos
      t.string :attribution
      t.integer :word_id, null: false

      t.timestamps
    end
    add_index :definitions, :definition, unique: true
    add_index :definitions, :word_id
  end
end
