class Definition < ApplicationRecord
  validates :definition, :word_id, presence: true
  validates :definition, uniqueness: true

  belongs_to :word

  def self.create_definitions(wordnik_definitions, word_id)
    wordnik_definitions.each do |result|
      definition = result['text']
      attribution = result['attributionText']
      pos = result['partOfSpeech']
      Definition.create(definition: definition, attribution: attribution,
                        pos: pos, word_id: word_id)
    end
  end
end
