require 'credential'
require 'exceptions'

# This class acts as a wrapper for the Wordnik API

# Wordnik API documentation is available at:
# http://developer.wordnik.com/docs.html
# This class mainly uses the `word' and `words' endpoints
class Wordnik
  include HTTParty
  include Exceptions
  base_uri 'api.wordnik.com:80/v4/'

  def initialize
    @api_key = Credential.wordnik_api_key
  end

  def api_available?(timeout_duration = 3)
    # Assumes the microservice is either all up or all down
    # Could use a head request, but this is infrequent, so just reuse get code
    response = fetch_definitions('test', timeout_duration).response

    response_succeeded?(response)
  end

  def fetch_definitions(word, timeout_duration = 3)
    endpoint = "/word.json/#{word}/definitions?"
    req_params = {
      limit: 200,
      includeRelated: true,
      useCanonical: false,
      includeTags: false,
      api_key: @api_key
    }

    req_string = create_req_string(endpoint, req_params)
    Wordnik.get(req_string, timeout: timeout_duration)
  end

  def fetch_examples(word, timeout_duration = 3)
    endpoint = "/word.json/#{word}/examples?"
    req_params = {
      includeDuplicates: false,
      useCanonical: false,
      skip: 0,
      limit: 5,
      api_key: @api_key
    }

    req_string = create_req_string(endpoint, req_params)
    Wordnik.get(req_string, timeout: timeout_duration)
  end

  def fetch_definitions_and_examples(word, timeout_duration = 3)
    results = {}

    threads = [
      Thread.new do
        results[:definitions] = fetch_definitions(word, timeout_duration)
      end,
      Thread.new do
        results[:examples] = fetch_examples(word, timeout_duration)
      end
    ]

    threads.each(&:join)

    if response_failed?(results[:definitions].response) ||
       response_failed?(results[:examples].response)
      raise Exceptions::ExternalApiError.new("Wordnik API unavailable")
    end

    results
  end

  def fetch_random_words(number)
    endpoint = "/words.json/randomWords?"
    req_params = {
      hasDictionaryDef: true,
      excludePartOfSpeech: 'proper-noun',
      minCorpusCount: 10000,
      maxCorpusCount: -1,
      minDictionaryCount: 1,
      maxDictionaryCount: -1,
      minLength: 5,
      maxLength: -1,
      limit: number,
      api_key: @api_key
    }

    req_string = create_req_string(endpoint, req_params)
    Wordnik.get(req_string)
  end

  def query_wordnik(string)
    endpoint = "/words.json/search/#{string}?"
    req_params = {
      caseSensitive: false,
      excludePartOfSpeech: 'proper-noun',
      minCorpusCount: 5,
      maxCorpusCount: -1,
      minDictionaryCount: 1,
      maxDictionaryCount: -1,
      minLength: 1,
      maxLength: -1,
      skip: 0,
      limit: 10,
      api_key: @api_key
    }

    req_string = create_req_string(endpoint, req_params)
    Wordnik.get(req_string)
  end

  # Consider splitting into a module if more APIs are added...
  def create_req_string(endpoint, req_params)
    req_string = endpoint.dup
    req_params.each { |k, v| req_string << "#{k}=#{v}&" }
    req_string[0...-1] # no trailing '&'
  end

  private

  def response_succeeded?(response)
    response.code == "200"
  end

  def response_failed?(response)
    response.code != "200"
  end
end
