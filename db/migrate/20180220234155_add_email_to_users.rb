class AddEmailToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :email, :string, null: false
    add_column :users, :validation_status, :boolean, default: false
    add_column :users, :validation_uri, :string
  end
end
