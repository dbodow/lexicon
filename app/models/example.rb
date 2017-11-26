class Example < ApplicationRecord
  validates :example, :word_id, presence: true
  validates :example, uniqueness: true

  belongs_to :word
end
