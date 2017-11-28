class UserList < ApplicationRecord
  validates :user_id, :list_id, presence: true
  validates :list_id, uniqueness: { scope: :user_id }

  belongs_to :user
  belongs_to :list
end
