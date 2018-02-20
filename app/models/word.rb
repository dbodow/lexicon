require 'wordnik'
require 'byebug'

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

    # Create missing words and cache them if they don't exist;
    # Update the timestamp of retrieved words to prevent them from
    # being deleted by the cleanup cron job (which uncaches words after
    # 1 month of not being used to adhere to the Wordnik license)
    if result
      result.updated_at = Time.now
      result.save
    else
      result = Word.create_word(word)
    end

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

  # Cleans the database of any words not accessed for 30 days
  # (Wordnik allows data to be cached, but not permanently stored
  # so running this periodically allows us to stay on good terms with
  # the license
  def self.cleanup_unused_words
    # byebug
    oldest_allowed_time = 30.days.ago

    Word.where('updated_at < ?', oldest_allowed_time).destroy_all
  end

  def example_ids
    examples.map(&:id)
  end

  def definition_ids
    definitions.map(&:id)
  end
end
