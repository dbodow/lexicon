require 'credential'

# This class acts as a wrapper for the Wordnik API

# Wordnik API documentation is available at:
# http://developer.wordnik.com/docs.html
# This class mainly uses the `word' and `words' endpoints
class Wordnik
  include HTTParty
  base_uri 'api.wordnik.com:80/v4/'

  def initialize
    @api_key = Credential.wordnik_api_key
  end

  def fetch_definitions(word)
    endpoint = "/word.json/#{word}/definitions?"
    req_params = {
      limit: 200,
      includeRelated: true,
      useCanonical: false,
      includeTags: false,
      api_key: @api_key
    }

    req_string = create_req_string(endpoint, req_params)
    Wordnik.get(req_string)
  end

  def fetch_examples(word)
    endpoint = "/word.json/#{word}/examples?"
    req_params = {
      includeDuplicates: false,
      useCanonical: false,
      skip: 0,
      limit: 5,
      api_key: @api_key
    }

    req_string = create_req_string(endpoint, req_params)
    Wordnik.get(req_string)
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
end
