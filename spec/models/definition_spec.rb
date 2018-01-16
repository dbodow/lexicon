require 'rails_helper'

RSpec.describe Definition do
  subject(:lexicon_def) { build(:definition) }
  describe 'validations and assiciations' do
    it { should validate_presence_of(:word_id) }
    it { should validate_presence_of(:definition) }
    it { should validate_uniqueness_of(:definition) }
    it { should belong_to(:word) }
  end

  describe '::create_definitions' do
    let(:lexicon_params) do
      {
        definition: 'vocabulary',
        attribution: 'AHED',
        pos: 'v',
        word_id: 7
      }
    end
    let(:creation_params) do
      [{
        'text' => 'vocabulary',
        'attributionText' => 'AHED',
        'partOfSpeech' => 'v'
      }]
    end

    it 'creates a definition with a definition, attribution, pos, and word_id' do
      allow(Definition).to receive(:create).with(lexicon_params).and_return(lexicon_def)

      expect(Definition).to receive(:create).with(lexicon_params)
      Definition.create_definitions(creation_params, 7)
    end
  end
end
