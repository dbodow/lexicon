require 'rails_helper'

RSpec.describe Api::QuizzesController do
  describe '#create' do
    let(:user) { create(:user) }
    let!(:list) { create(:list) }
    let!(:word) { create(:real_word) }
    let!(:user_list) do
      create(:user_list,
             user_id: user.id,
             list_id: list.id)
    end
    let!(:list_word) do
      create(:list_word,
             word_id: word.id,
             list_id: list.id)
    end

    subject(:correct_create_req) do
      post :create,
      params: { correct: true },
      format: :json
    end

    let(:wrong_create_req) do
      post :create,
      params: { correct: false },
      format: :json
    end

    before do
      # lots of mocking; this behavior will be tested in the e2e tests.
      # as an afterthought, maybe not worth testing this controller...
      allow(controller).to receive(:current_user).and_return(user)
      allow(controller).to receive(:random_active_list_word)
        .and_return('solution_word_object')
      allow(controller).to receive(:fetch_correct_answer)
        .and_return('correct_str')
      allow(controller).to receive(:fetch_random_wrong_answers)
        .and_return(%w(wrong_str1 wrong_str2 wrong_str3 wrong_str4))
    end

    it 'renders the show JBuilder view' do
      expect(correct_create_req).to render_template(:show)
    end

    it 'responds with a 200 response' do
      expect(correct_create_req).to have_http_status(200)
    end

    context 'when a user got the last question right' do
      it 'increments the user\'s points' do
        expect(user).to receive(:increment_points)

        correct_create_req
      end
    end

    context 'when a user got the last question wrong' do
      it 'does not increment the user\'s points' do
        expect(user).not_to receive(:increment_points)

        wrong_create_req
      end
    end
  end
end
