require 'wordnik'

class Word < ApplicationRecord
  validates :word, presence: true, uniqueness: true

  has_many :examples
  has_many :definitions

  @@wordnik ||= Wordnik.new

  def self.fetch_random_words(number)
    @@wordnik.fetch_random_words(number).parsed_response
  end

  def self.fetch_definitions(word)
    @@wordnik.fetch_definitions(word).parsed_response
  end

  def self.fetch_examples(word)
    @@wordnik.fetch_examples(word).parsed_response
  end

  def self.query_wordnik(string)
    @@wordnik.query_wordnik(string).parsed_response
  end

  def example_ids
    examples.map(&:id)
  end

  def definition_ids
    definitions.map(&:id)
  end
end
