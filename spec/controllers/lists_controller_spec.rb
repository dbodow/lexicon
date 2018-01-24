require 'rails_helper'

RSpec.describe Api::ListsController do
  let(:user) { create(:user) }
  let(:list) { create(:list) }
  let(:word) { create(:real_word) }
  let(:word2) { create(:real_word, word: 'leitmotif') }
  let(:user_list) do
    create(:user_list,
           user_id: user.id,
           list_id: list.id)
  end
  let(:list_word) do
    create(:list_word,
           word_id: word.id,
           list_id: list.id)
  end
  let(:list_word2) do
    create(:list_word,
           word_id: word2.id,
           list_id: list.id)
  end

  before do
    allow(controller).to receive(:current_user).and_return(user)
  end

  describe '#index' do
    subject(:index_req) do
      get :index,
      format: :json
    end

    it 'looks up the current user\'s lists preloading list_words' do
      expect { index_req }.to make_database_queries(
        matching: /SELECT "list_words"/,
        count: 0..1
      )
    end

    it 'renders the index JBuilder view' do
      expect(index_req).to render_template(:index)
    end

    it 'responds with a 200 status' do
      expect(index_req).to have_http_status(200)
    end
  end

  describe '#show' do
    subject(:show_req) do
      get :show,
      params: {
        id: list.id
      },
      format: :json
    end

    it 'delegates list lookup to #load_list to preload associations' do
      allow(controller).to receive(:load_list)
        .with(list.id.to_s).and_call_original

      expect(controller).to receive(:load_list).with(list.id.to_s)
      show_req
    end
    context 'when the list cannot be found' do
      let(:bad_show_req) do
        get :show,
        params: {
          id: 'not even a number'
        },
        format: :json
      end

      it 'renders the show_error JBuilder view' do
        expect(bad_show_req).to render_template(:show_error)
      end

      it 'responds with a 404 error' do
        expect(bad_show_req).to have_http_status(404)
      end
    end

    context 'when the list is successfully retrieved' do
      it 'renders the show JBuilder view' do
        expect(show_req).to render_template(:show)
      end

      it 'responds with a 200 status' do
        expect(show_req).to have_http_status(200)
      end
    end
  end

  describe '#create' do
    subject(:create_req) do
      post :create,
      params: {
        list: {
          title: 'my cool title',
          description: 'this is a list',
          words: ['lexicon']
        }
      },
      format: :json
    end

    it 'delegates list creation to List#create_list' do
      allow(List).to receive(:create_list).and_call_original

      expect(List).to receive(:create_list)
      create_req
    end
    context 'when the creation is successful' do
      it 'delegates list lookup to #load_list to preload associations' do
        allow(controller).to receive(:load_list).and_call_original

        expect(controller).to receive(:load_list)
        create_req
      end

      it 'renders the show JBuilder view' do
        expect(create_req).to render_template(:show)
      end
    end
  end

  describe '#destroy' do
    subject(:destroy_req) do
      delete :destroy,
      params: { id: list.id }
    end

    it 'destroys a given list (if it exists)' do
      id = list.id
      destroy_req
      expect(List.find_by_id(id)).to be_nil
    end
  end

  describe '#update' do
    subject(:update_req) do
      patch :update,
      params: { id: list.id },
      format: :json
    end

    it 'delegates list lookup to #load_list to preload associations' do
      allow(controller).to receive(:load_list)
        .with(list.id.to_s).and_call_original

      expect(controller).to receive(:load_list).with(list.id.to_s)
      update_req
    end

    context 'when the specified list does not exist' do
      subject(:bad_update_req) do
        patch :update,
        params: { id: 'not even a number' },
        format: :json
      end

      it 'renders the show_error JBuilder view' do
        expect(bad_update_req).to render_template(:show_error)
      end

      it 'responds with a 404 error' do
        expect(bad_update_req).to have_http_status(404)
      end
    end

    context 'when the specified list is found' do
      it 'renders the show JBuilder view' do
        expect(update_req).to render_template(:show)
      end

      it 'responds with a 200 status' do
        expect(update_req).to have_http_status(200)
      end
    end
  end

  describe '#load_list' do
    let(:preloaded_list) { controller.send(:load_list, list.id).first }

    it 'preloads a list\'s words' do
      expect { preloaded_list.words }.to make_database_queries(
        matching: /SELECT "words"/,
        count: 0..1
      )
    end

    it 'preloads a list\'s definitions' do
      expect { preloaded_list.definitions }.to make_database_queries(
        matching: /SELECT "definitions"/,
        count: 0..1
      )
    end

    it 'preloads a list\'s examples' do
      expect { preloaded_list.definitions }.to make_database_queries(
        matching: /SELECT "definitions"/,
        count: 0..1
      )
    end
  end
end
