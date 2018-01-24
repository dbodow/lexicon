require 'rails_helper'

RSpec.describe Api::WordsController do
  describe 'get #index' do
    subject(:index_req) do
      get :index,
      params: {
        query: 'lexicon'
      },
      format: :json
    end

    let(:query) { 'lexicon' }
    let(:no_query_results) { { 'totalResults' => 0 } }
    let(:query_results) do
      {
        'totalResults' => 1,
        'searchResults' => [
          {
            'count' => 1,
            'lexicality' => 0,
            'word' => 'lexicon'
          }
        ]
      }
    end

    it 'delegates the query to the Word class' do
      allow(Word).to receive(:query_wordnik)
        .with(query)
        .and_return(query_results)

      expect(Word).to receive(:query_wordnik).with(query)
      index_req
    end

    context 'when the Wordnik query fails for any reason' do
      before(:each) do
        allow(Word).to receive(:query_wordnik).and_raise(StandardError)
      end

      it 'renders the index_error JBuilder view' do
        expect(index_req).to render_template(:index_error)
      end

      it 'responds with a 422 error' do
        expect(index_req).to have_http_status(422)
      end
    end

    context 'when the Wordnik query succeeds with no results' do
      before(:each) do
        allow(Word).to receive(:query_wordnik)
          .with(query)
          .and_return(no_query_results)
      end

      it 'renders the index_error JBuilder view' do
        expect(index_req).to render_template(:index_error)
      end

      it 'responds with a 404 error' do
        expect(index_req).to have_http_status(404)
      end
    end

    context 'when the Wordnik query succeeds with results' do
      before(:each) do
        allow(Word).to receive(:query_wordnik)
          .with(query)
          .and_return(query_results)
      end

      it 'renders the index JBuilder view' do
        expect(index_req).to render_template(:index)
      end

      it 'responds with a 200 status' do
        expect(index_req).to have_http_status(200)
      end
    end
  end

  describe 'get #show' do
    subject(:show_req) do
      get :show,
      params: {
        word: 'lexicon'
      },
      format: :json
    end

    let(:word_query) { 'lexicon' }
    let(:word_result) { build(:real_word) }

    it 'delegates the lookup to the Word class' do
      allow(Word).to receive(:find_by_word).with(word_query)

      expect(Word).to receive(:find_by_word).with(word_query)
      show_req
    end

    context 'when the word lookup fails' do
      before(:each) do
        allow(Word).to receive(:find_by_word)
          .and_return(nil)
      end

      it 'render the show_error JBuilder view' do
        expect(show_req).to render_template(:show_error)
      end

      it 'responds with a 404 error' do
        expect(show_req).to have_http_status(404)
      end
    end

    context 'when the word lookup succeeds' do
      before(:each) do
        allow(Word).to receive(:find_by_word)
          .and_return(word_result)
      end

      it 'renders the show Jbuilder view' do
        expect(show_req).to render_template(:show)
      end

      it 'responds with a 200 success' do
        expect(show_req).to have_http_status(200)
      end
    end
  end
end
