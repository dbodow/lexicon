class CreateExamples < ActiveRecord::Migration[5.1]
  def change
    create_table :examples do |t|
      t.string :example, null: false
      t.string :example_source
      t.integer :word_id, null: false

      t.timestamps
    end
    add_index :examples, :example, unique: true
    add_index :examples, :word_id
  end
end
