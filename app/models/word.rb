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

  # Share a single Wordnik / Datamuse instance to reduce memory usage
  # (Slightly more performative as class variable than Singleton)
  @@wordnik ||= Wordnik.new
  @@datamuse ||= Datamuse.new

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
    # Lookup in database cache to reduce API calls to Wordnik
    result = Word.find_by(word: word)

    # Create missing words and cache them if they don't exist
    result ||= Word.create_word(word)
    result
  end

  # returns array of *strings*, not Word objects
  def self.fetch_random_words(number)
    @@wordnik.fetch_random_words(number).parsed_response.map do |res|
      res['word']
    end
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

  def self.fetch_top_synonym(string)
    @@datamuse.fetch_top_synonym(string)
  end

  def example_ids
    examples.map(&:id)
  end

  def definition_ids
    definitions.map(&:id)
  end
end
