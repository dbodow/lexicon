class CreateListWords < ActiveRecord::Migration[5.1]
  def change
    create_table :list_words do |t|
      t.integer :list_id, null: false
      t.integer :word_id, null: false

      t.timestamps
    end

    add_index :list_words, [:list_id, :word_id], unique: true
  end
end
