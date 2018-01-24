require 'rails_helper'

RSpec.describe Api::ListsController do
  before do
    user = User.create!(
        username: SecureRandom.hex,
        password: SecureRandom.hex
    )
    list = List.create_list(user, ['lexicon'])
    allow(controller).to receive(:current_user).and_return(user)
  end

  after do
    user.destroy!
    list.destroy!
  end

  describe '#index' do
    subject(:index_req) do
      get :index,
      format: :json
    end

    it 'looks up the current user\'s lists preloading list_words'
    it 'renders the index JBuilder view' do
      expect(index_req).to render_template(:index)
    end

    it 'responds with a 200 status' do
      expect(index_req).to have_http_status(200)
    end
  end

  describe '#show' do
    subject(:show_req) do
      get :index,
      params: {
        id: list.id
      },
      format: :json
    end

    it 'delegates list lookup to #load_list to preload associations'
    context 'when the list cannot be found' do
      it 'renders the show_error JBuilder view'
      it 'responds with a 404 error' do
        expect(:show_req).to have_http_status(404)
      end
    end
    context 'when the list is successfully retrieved' do
      it 'renders the show JBuilder view'
      it 'responds with a 200 status' do
        expect(:show_req).to have_http_status(200)
      end
    end
  end

  describe '#create' do
    it 'delegates list creation to List#create_list'
    context 'when the creation is successful' do
      it 'delegates list lookup to #load_list to preload associations'
      it 'renders the show JBuilder view'
    end
  end

  describe '#destroy' do
    it 'destroys a given list'
  end

  describe '#update' do
    it 'delegates list lookup to #load_list to preload associations'

    context 'when the specified list does not exist' do
      it 'renders the update_error JBuilder view'
      it 'responds with a 404 error'
    end

    context 'when the specified list is found' do
      it 'renders the show JBuilder view'
      it 'responds with a 200 status'
    end
  end

  describe '#load_list' do
    it 'preloads a list\'s words'
    it 'preloads a list\'s definitions'
    it 'preloads a list\'s examples'
  end
end
