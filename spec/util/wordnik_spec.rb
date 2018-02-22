require 'rails_helper'

# For API wrappers, test coverage checking parameters is limited
# to non-default parameters
RSpec.describe Wordnik do
  let(:test_word) { 'hello' }
  let(:test_num) { 324 }
  let(:api_key) { Wordnik.class_variable_get(:@@api_key) }

  describe 'modules' do
    it 'includes HTTParty as a module' do
      expect(Wordnik.included_modules).to include(HTTParty)
    end

    it 'includes Exceptions as a module' do
      expect(Wordnik.included_modules).to include(Exceptions)
    end
  end

  describe '#initialize' do
    it 'stores an API key' do
      expect(api_key).to_not be_nil
    end
  end

  describe '#fetch_definitions' do
    after(:each) do
      Wordnik.fetch_definitions(test_word)
    end

    it 'sends a GET request to the right endpoint through HTTParty' do
      expect(Wordnik).to receive(:get) do |req|
        expect(req).to match(/\/word.json\/[a-zA-Z]*\/definitions\?/)
      end
    end

    it 'interpolates the argument word into the api endpoint string' do
      expect(Wordnik).to receive(:get) do |req|
        expect(req).to include(test_word)
      end
    end

    it 'interpolates the API key into the request' do
      expect(Wordnik).to receive(:get) do |req|
        expect(req).to include(api_key)
      end
    end
  end

  describe '#fetch_examples' do
    after(:each) do
      Wordnik.fetch_examples(test_word)
    end

    it 'sends a GET request to the right endpoint through HTTParty' do
      expect(Wordnik).to receive(:get) do |req|
        expect(req).to match(/\/word.json\/[a-zA-Z]*\/examples\?/)
      end
    end

    it 'interpolates the argument word into the api endpoint string' do
      expect(Wordnik).to receive(:get) do |req|
        expect(req).to include(test_word)
      end
    end

    it 'interpolates the API key into the request' do
      expect(Wordnik).to receive(:get) do |req|
        expect(req).to include(api_key)
      end
    end

    it 'limits the response to 5 examples' do
      expect(Wordnik).to receive(:get) do |req|
        expect(req).to include('limit=5')
      end
    end
  end

  describe '#fetch_random_words' do
    after(:each) do
      Wordnik.fetch_random_words(test_num)
    end

    it 'sends a GET request to the right endpoint through HTTParty' do
      expect(Wordnik).to receive(:get) do |req|
        expect(req).to include('/words.json/randomWords?')
      end
    end

    it 'interpolates the argument number into the api endpoint string' do
      expect(Wordnik).to receive(:get) do |req|
        expect(req).to include(test_num.to_s)
      end
    end

    it 'interpolates the API key into the request' do
      expect(Wordnik).to receive(:get) do |req|
        expect(req).to include(api_key)
      end
    end

    it 'limits the response to allow future dictionary lookup' do
      expect(Wordnik).to receive(:get) do |req|
        expect(req).to include('hasDictionaryDef=true')
      end
    end

    it 'limits the response to exclude proper nouns' do
      expect(Wordnik).to receive(:get) do |req|
        expect(req).to include('excludePartOfSpeech=proper-noun')
      end
    end

    it 'limits the response to exclude trivial words' do
      expect(Wordnik).to receive(:get) do |req|
        expect(req).to include('minCorpusCount=10000')
        expect(req).to include('minLength=5')
      end
    end
  end

  describe '#query_wordnik' do
    after(:each) do
      Wordnik.query_wordnik(test_word)
    end

    it 'sends a GET request to the right endpoint through HTTParty' do
      expect(Wordnik).to receive(:get) do |req|
        expect(req).to match(/\/words.json\/search\/[a-zA-Z]*\?/)
      end
    end

    it 'interpolates the argument word into the api endpoint string' do
      expect(Wordnik).to receive(:get) do |req|
        expect(req).to include(test_word)
      end
    end

    it 'interpolates the API key into the request' do
      expect(Wordnik).to receive(:get) do |req|
        expect(req).to include(api_key)
      end
    end

    it 'limits the response to exclude proper nouns' do
      expect(Wordnik).to receive(:get) do |req|
        expect(req).to include('excludePartOfSpeech=proper-noun')
      end
    end

    it 'limits the response to the 10 best matches' do
      expect(Wordnik).to receive(:get) do |req|
        expect(req).to include('limit=10')
      end
    end

    it 'limits the response to words in general use' do
      expect(Wordnik).to receive(:get) do |req|
        expect(req).to include('minCorpusCount=5')
      end
    end
  end
end
