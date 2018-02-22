require 'rails_helper'

# For API wrappers, test coverage checking parameters is limited
# to non-default parameters
RSpec.describe Datamuse do
  let(:test_word) { 'hello' }
  let(:test_synonyms) { %w(hi howdy) }

  describe 'modules' do
    it 'includes HTTParty as a module' do
      expect(Datamuse.included_modules).to include(HTTParty)
    end
  end

  describe '#fetch_synonyms' do
    after(:each) do
      Datamuse.fetch_synonyms(test_word)
    end

    it 'sends a GET request to the right endpoint through HTTParty' do
      expect(Datamuse).to receive(:get) do |req|
        expect(req).to match(/\/words\?ml=[a-zA-Z]*/)
        expect(req).to include(test_word)
      end
    end
  end

  describe '#fetch_top_synonym' do
    after(:each) do
      Datamuse.fetch_top_synonym(test_word)
    end

    it 'delegates to #fetch_synonyms' do
      allow(Datamuse).to receive(:fetch_synonyms).and_return(test_synonyms)

      expect(Datamuse).to receive(:fetch_synonyms).with(test_word)
    end
  end
end
