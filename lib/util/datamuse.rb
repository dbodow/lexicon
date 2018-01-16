# This class acts as a wrapper for the Datamuse API

# Datamuse API documentation is available at:
# http://www.datamuse.com/api/
class Datamuse
  include HTTParty
  base_uri 'api.datamuse.com'

  # `ml` = `meaning like`
  def fetch_synonyms(word)
    self.class.get("/words?ml=#{word}")
  end

  def fetch_top_synonym(word)
    fetch_synonyms(word).first
  end
end
