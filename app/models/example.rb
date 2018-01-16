class Example < ApplicationRecord
  validates :example, :word_id, presence: true
  validates :example, uniqueness: true

  belongs_to :word

  def self.create_examples(wordnik_examples, word_id)
    wordnik_examples.each do |result|
      example = result['text']
      example_source = result['title']
      Example.create(example: example, example_source: example_source,
                     word_id: word_id)
    end
  end
end
