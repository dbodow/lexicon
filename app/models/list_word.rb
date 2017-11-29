class ListWord < ApplicationRecord
  validates :list_id, :word_id, presence: true
  validates :word_id, uniqueness: { scope: :list_id }

  belongs_to :word
  belongs_to :list
end
