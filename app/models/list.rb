class List < ApplicationRecord
  validates :title, presence: true

  has_many :list_words,
           dependent: :destroy
  has_many :words,
           through: :list_words,
           source: :word

  has_many :user_lists,
           dependent: :destroy
  has_many :users,
           through: :user_lists,
           source: :user

  def self.create_list(user, arg_words, list)
    ActiveRecord::Base.transaction do
      list.save!
      list.user_lists.create!(user_id: user.id)
      arg_words.each do |arg_word|
        word = Word.find_by_word(arg_word)
        word.list_words.create!(list_id: list.id) if word
      end
    end
  end
end
