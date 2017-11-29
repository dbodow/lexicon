class Definition < ApplicationRecord
  validates :definition, :word_id, presence: true
  validates :definition, uniqueness: true

  belongs_to :word

  def self.create_definitions(wordnikDefinitions, word_id)
    wordnikDefinitions.each do |result|
      definition = result['text']
      attribution = result['attributionText']
      pos = result['partOfSpeech']
      Definition.create(definition: definition, attribution: attribution,
                        pos: pos, word_id: word_id)
    end
  end
end
