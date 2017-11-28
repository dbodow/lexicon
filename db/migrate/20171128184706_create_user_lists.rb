class CreateUserLists < ActiveRecord::Migration[5.1]
  def change
    create_table :user_lists do |t|

      t.timestamps
    end
  end
end
