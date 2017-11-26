class Definition < ApplicationRecord
  validates :definition, :pos, :word_id, presence: true
  validates :definition, uniqueness: true

  belongs_to :word
end
