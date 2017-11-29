require 'wordnik'

class Word < ApplicationRecord
  validates :word, presence: true, uniqueness: true

  has_many :examples,
           dependent: :destroy
  has_many :definitions,
           dependent: :destroy

  has_many :list_words,
           dependent: :destroy
  has_many :lists,
           through: :list_words,
           source: :list

  @@wordnik ||= Wordnik.new

  def self.create_word(word)
    # check that the word exists
    definitions = Word.fetch_definitions(word)
    return false if definitions.empty?
    # build word, definitions, and examples
    new_word = Word.create(word: word)
    word_id = new_word.id
    examples = Word.fetch_examples(word)['examples']
    Definition.create_definitions(definitions, word_id)
    Example.create_examples(examples, word_id)
    new_word
  end

  def self.find_by_word(word)
    result = Word.find_by(word: word)
    result ||= Word.create_word(word)
    result
  end

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
