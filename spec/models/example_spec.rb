require 'rails_helper'

RSpec.describe Example do
  subject(:lexicon_example) { build(:example) }

  describe 'validations and assiciations' do
    it { should validate_presence_of(:example) }
    it { should validate_presence_of(:word_id) }
    it { should validate_uniqueness_of(:example) }
    it { should belong_to(:word) }
  end

  describe 'Example::create_examples' do
    let(:lexicon_params) do
      {
        example: 'Lexicon is a great site',
        example_source: 'David Bodow',
        word_id: 7
      }
    end
    let(:creation_params) do
      [{
        'text' => 'Lexicon is a great site',
        'title' => 'David Bodow'
      }]
    end

    it 'creates an example with an example, example_source and word_id' do
      allow(Example).to receive(:create).with(lexicon_params).and_return(lexicon_example)

      expect(Example).to receive(:create).with(lexicon_params)
      Example.create_examples(creation_params, 7)
    end
  end
end
