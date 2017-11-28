class List < ApplicationRecord
  validates :title, presence: true

  has_many :listwords
  has_many :words,
           through: :listwords,
           source: :word

  has_many :userlists
  has_many :users,
           through: :userlists,
           source: :user
end
