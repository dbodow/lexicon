require 'rails_helper'

RSpec.describe Word do
  subject(:real_word) { build(:real_word) }

  it 'uses a single instance of Wordnik for requests' do
    expect(Word.class_variable_get(:@@wordnik)).to be_a(Wordnik)
  end

  context "when validating a new word" do
    it { should validate_presence_of(:word) }

    it { should validate_uniqueness_of(:word) }
  end

  describe 'Associations' do
    it { should have_many(:examples).dependent(:destroy) }
    it { should have_many(:definitions).dependent(:destroy) }
    it { should have_many(:list_words).dependent(:destroy) }
    it { should have_many(:lists) }
  end

  describe 'API calls' do
    let(:wn) { Word.class_variable_get(:@@wordnik) }
    let(:query) { 'hello' }
    let(:api_res) do
      double('HTTParty::Response dbl', parsed_response: 'blah')
    end

    describe "::fetch_random_words" do
      let(:num_query) { 5 }
      let(:hash_api_res) do
        double('HTTParty::Response dbl2',
               parsed_response: [{ 'word' => 'blah' }])
      end

      it 'delegates to Wordnik#fetch_random_words' do
        allow(wn).to receive(:fetch_random_words).and_return(hash_api_res)

        expect(Word.fetch_random_words(query)).to eq(['blah'])
      end
    end

    describe "::fetch_definitions" do
      it 'delegates to Wordnik#fetch_definitions' do
        allow(wn).to receive(:fetch_definitions).and_return(api_res)

        expect(Word.fetch_definitions(query)).to eq('blah')
      end
    end

    describe "::fetch_examples" do
      it 'delegates to Wordnik#fetch_examples' do
        allow(wn).to receive(:fetch_examples).and_return(api_res)

        expect(Word.fetch_examples(query)).to eq('blah')
      end
    end

    describe "::query_wordnik" do
      it 'delegates to Wordnik#query_wordnik' do
        allow(wn).to receive(:query_wordnik).and_return(api_res)

        expect(Word.query_wordnik(query)).to eq('blah')
      end
    end
  end

  describe 'Factory methods' do
    describe '::create_word' do
      context 'when no such word exists' do
        it 'validates that a word has definitions' do
          allow(Word).to receive(:fetch_definitions).and_return([])

          expect(Word.create_word('apwymzfjf')).to be false
        end
      end

      context 'when a valid word exists' do
        before(:each) do
          allow(Word).to receive(:fetch_definitions).and_return(['def'])
          allow(Word).to receive(:fetch_examples).and_return({ 'examples' => ['ex'] })
          allow(Word).to receive(:create).and_return(real_word)
          allow(Definition).to receive(:create_definitions)
          allow(Example).to receive(:create_examples)
          allow(real_word).to receive(:id).and_return(7)
        end

        it 'creates a new word' do
          expect(Word).to receive(:create).with(word: 'lexicon')
          Word.create_word('lexicon')
        end

        it 'delegates to Definition::create_definitions' do
          expect(Definition).to receive(:create_definitions).with(['def'], 7)
          Word.create_word('lexicon')
        end

        it 'delegates to Example::create_examples' do
          expect(Example).to receive(:create_examples).with(['ex'], 7)
          Word.create_word('lexicon')
        end

        it 'returns the created word' do
          expect(Word.create_word('lexicon')).to be(real_word)
        end
      end
    end

    describe '::find_by_word' do
      it 'checks whether the word exists in the database' do
        allow(Word).to receive(:find_by).with(word: 'lexicon').and_return(real_word)

        expect(Word).not_to receive(:create_word)
        expect(Word.find_by_word('lexicon')).to be(real_word)
      end

      it 'delegates to Word::create_word if creating a new word' do
        allow(Word).to receive(:find_by).with(word: 'lexicon').and_return(nil)
        allow(Word).to receive(:create_word).with('lexicon').and_return(real_word)

        expect(Word.find_by_word('lexicon')).to be(real_word)
      end
    end
  end

  describe 'database/React state slice utilities' do
    let(:dbl_exs) { [double('example', id: 3)] }
    let(:dbl_defs) { [double('definition', id: 4)] }

    describe '#example_ids' do
      it 'provides a list of ids from associated examples' do
        allow(real_word).to receive(:examples).and_return(dbl_exs)

        expect(real_word.example_ids).to eq([3])
      end
    end

    describe '#definition_ids' do
      it 'provides a list of ids from associated definitions' do
        allow(real_word).to receive(:definitions).and_return(dbl_defs)

        expect(real_word.definition_ids).to eq([4])
      end
    end
  end
end
