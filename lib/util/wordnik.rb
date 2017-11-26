require 'credential'

class Wordnik
  include HTTParty
  base_uri 'api.wordnik.com:80/v4/'

  def initialize
    @api_key = Credential.wordnik_api_key
  end

  def fetch_definitions(word)
    self.class.get("/word.json/#{word}/definitions?limit=200&includeRelated=true&useCanonical=false&includeTags=false&api_key=#{@api_key}")
  end

  def fetch_examples(word)
    self.class.get("/word.json/#{word}/examples?includeDuplicates=false&useCanonical=false&skip=0&limit=5&api_key=#{@api_key}")
  end

  def fetch_random_words(number)
    self.class.get("/words.json/randomWords?hasDictionaryDef=true&excludePartOfSpeech=proper-noun&minCorpusCount=10000&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&limit=#{number}&api_key=#{@api_key}")
  end

  def query_wordnik(string)
    self.class.get("/words.json/search/#{string}?caseSensitive=false&excludePartOfSpeech=proper-noun&minCorpusCount=5&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=1&maxLength=-1&skip=0&limit=10&api_key=#{@api_key}")
  end
end
