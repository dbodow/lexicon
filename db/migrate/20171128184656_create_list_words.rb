class CreateListWords < ActiveRecord::Migration[5.1]
  def change
    create_table :list_words do |t|

      t.timestamps
    end
  end
end
