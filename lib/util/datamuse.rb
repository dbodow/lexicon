# This class acts as a wrapper for the Datamuse API

# Datamuse API documentation is available at:
# http://www.datamuse.com/api/
class Datamuse
  include HTTParty
  base_uri 'api.datamuse.com'

  # `ml` = `meaning like`
  def self.fetch_synonyms(word)
    Datamuse.get("/words?ml=#{word}")
  end

  def self.fetch_top_synonym(word)
    Datamuse.fetch_synonyms(word).first
  end
end
