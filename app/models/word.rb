require 'wordnik'
require 'exceptions'

class Word < ApplicationRecord
  include Exceptions

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

  def self.create_word(word)
    # lookup the word
    word_data = Word.fetch_definitions_and_examples(word)
    definitions, examples = word_data[:definitions], word_data[:examples]

    # allow word creation only if definitions exist
    # lack of usage examples is acceptable, but in practice,
    # words are more likely to lack a definition than an example
    return false if definitions.empty?

    # build word, definitions, and examples
    new_word = Word.create(word: word)
    word_id = new_word.id
    Definition.create_definitions(definitions, word_id)
    Example.create_examples(examples, word_id)

    new_word
  # rescue Exceptions::ExternalApiError
  #   # expected behavior is to return false in a failure
  #   return false
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
    Wordnik.fetch_random_words(number).parsed_response.map do |res|
      res['word']
    end
  end

  def self.fetch_definitions(word)
    Wordnik.fetch_definitions(word).parsed_response
  end

  def self.fetch_examples(word)
    Wordnik.fetch_examples(word).parsed_response
  end

  def self.fetch_definitions_and_examples(word)
    responses = Wordnik.fetch_definitions_and_examples(word)
    {
      definitions: responses[:definitions].parsed_response,
      examples: responses[:examples].parsed_response['examples']
    }
  # rescue ExternalApiError
  #   WordRequestCache.enqueue_query(word)
  #   raise ExternalApiError("Wordnik API unavailable")
  end

  def self.query_wordnik(string)
    Wordnik.query_wordnik(string).parsed_response
  end

  def self.fetch_top_synonym(string)
    Datamuse.fetch_top_synonym(string)
  end

  # Cleans the database of any words not accessed for 30 days
  # (Wordnik allows data to be cached, but not permanently stored
  # so running this periodically allows us to stay on good terms with
  # the license
  def self.cleanup_unused_words
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
