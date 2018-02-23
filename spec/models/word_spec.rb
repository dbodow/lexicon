require 'rails_helper'

RSpec.describe Word do
  subject(:real_word) { build(:real_word) }

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
    let(:query) { 'hello' }
    let(:api_res) do
      double('HTTParty::Response dbl', parsed_response: 'blah')
    end

    describe "::fetch_random_words" do
      let(:hash_api_res) do
        double('HTTParty::Response dbl2',
               parsed_response: [{ 'word' => 'blah' }])
      end

      it 'delegates to Wordnik#fetch_random_words' do
        allow(Wordnik).to receive(:fetch_random_words)
          .with(query).and_return(hash_api_res)

        expect(Word.fetch_random_words(query)).to eq(['blah'])
      end
    end

    describe "::fetch_definitions" do
      it 'delegates to Wordnik#fetch_definitions' do
        allow(Wordnik).to receive(:fetch_definitions)
          .with(query).and_return(api_res)

        expect(Word.fetch_definitions(query)).to eq('blah')
      end
    end

    describe "::fetch_examples" do
      it 'delegates to Wordnik#fetch_examples' do
        allow(Wordnik).to receive(:fetch_examples)
          .with(query).and_return(api_res)

        expect(Word.fetch_examples(query)).to eq('blah')
      end
    end

    describe "::query_wordnik" do
      it 'delegates to Wordnik#query_wordnik' do
        allow(Wordnik).to receive(:query_wordnik)
          .with(query).and_return(api_res)

        expect(Word.query_wordnik(query)).to eq('blah')
      end
    end

    describe "::fetch_top_synonym" do
      it 'delegates to Datamuse#fetch_top_synonym' do
        allow(Datamuse).to receive(:fetch_top_synonym)
          .with(query).and_return(api_res)

        expect(Word.fetch_top_synonym(query)).to eq(api_res)
      end
    end
  end

  describe 'Factory methods' do
    describe '::create_word' do
      context 'when no such word exists' do
        it 'validates that a word has definitions' do
          allow(Word).to receive(:fetch_definitions_and_examples)
            .and_return({
                definitions: [],
                examples: []
              })

          expect(Word.create_word('apwymzfjf')).to be false
        end
      end

      context 'when a valid word exists' do
        before(:each) do
          allow(Word).to receive(:fetch_definitions_and_examples)
            .and_return({
              definitions: ['def'],
              examples: ['ex']
              })
          allow(Word).to receive(:create).and_return(real_word)
          allow(Definition).to receive(:create_definitions)
          allow(Example).to receive(:create_examples)
          allow(real_word).to receive(:id).and_return(7)
        end

        it 'creates a new word' do
          expect(Word).to receive(:create)

          Word.create_word('lexicon')
        end

        it 'delegates to Definition::create_definitions' do
          expect(Definition).to receive(:create_definitions)
            .with(['def'], 7)

          Word.create_word('lexicon')
        end

        it 'delegates to Example::create_examples' do
          expect(Example).to receive(:create_examples)
            .with(['ex'], 7)

          Word.create_word('lexicon')
        end

        it 'returns the created word' do
          expect(Word.create_word('lexicon')).to be(real_word)
        end
      end
    end

    describe '::find_by_word' do
      it 'checks whether the word exists in the database' do
        allow(Word).to receive(:find_by)
          .with(word: 'lexicon')
          .and_return(real_word)

        expect(Word).not_to receive(:create_word)
        expect(Word.find_by_word('lexicon')).to be(real_word)
      end

      context 'when creating a new word' do
        it 'delegates to Word::create_word' do
          allow(Word).to receive(:find_by)
            .with(word: 'lexicon')
            .and_return(nil)

          allow(Word).to receive(:create_word)
            .with('lexicon')
            .and_return(real_word)

          expect(Word.find_by_word('lexicon')).to be(real_word)
        end
      end

      context 'when retrieving an existing word' do
        let(:old_word) { create(:old_word) }

        it 'updates the updated_at timestamp' do
          retrieved_word = Word.find_by_word(old_word.word)

          expect(retrieved_word.updated_at).to be_within(1.second).of Time.now
        end
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

  describe 'cron scripts' do
    describe '#cleanup_unused_words' do
      after(:all) { Word.all.destroy_all } # clean up persisted words

      context 'when a word is more than a month old' do
        it 'is deleted from the database' do
          Word.create(word: 'blah', updated_at: Time.new(2000))
          Word.cleanup_unused_words

          expect(Word.all).to be_empty
        end
      end

      context 'when a word is less than a month old' do
        it 'remains in the database' do
          Word.create(word: 'blah')
          Word.cleanup_unused_words

          expect(Word.all).not_to be_empty
        end
      end
    end
  end
end
