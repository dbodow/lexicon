require 'rails_helper'

RSpec.describe List do
  subject(:list) { build(:list) }
  describe 'validations and associations' do
    it { should validate_presence_of(:title) }
    it { should have_many(:list_words).dependent(:destroy) }
    it { should have_many(:words) }
    it { should have_many(:definitions) }
    it { should have_many(:examples) }
    it { should have_many(:user_lists).dependent(:destroy) }
    it { should have_many(:users) }
  end

  describe '::create_list' do
    # using real models; the stubbing is ridiculous otherwise
    let(:arg_words) { %w(lexicon) } # should be seeded in
    # responds to 'password' if needed
    let(:digest) do
      '$2a$10$VcMWUQPL0M81JEDwZOrx2.0aQuyBsAQ1IQPXUbmmPAV3vQ4s89yK2'
    end
    let(:user) do
      User.new(
        username: "gStein",
        points: 2300,
        password_digest: digest,
        session_token: 'O8fDG4NKQqiBu-ED8nkvkQ'
      )
    end
    let(:real_list) { List.new(title: 'a title') }

    before(:each) do
      user.save!
    end

    after(:each) do
      user.destroy!
    end

    it 'saves a new list' do
      expect {
        List.create_list(user, arg_words, real_list)
      }.to change { List.count }
    end

    it 'creates user_lists linking the given user to the list' do
      expect {
        List.create_list(user, arg_words, real_list)
      }.to change { UserList.count }
    end

    it 'creates list_words linking valid words to the list' do
      expect {
        List.create_list(user, arg_words, real_list)
      }.to change { ListWord.count }
    end

    it 'delegates to Word::find_by_word for word lookup' do
      expect(Word).to receive(:find_by_word)

      List.create_list(user, arg_words, list)
    end

    # https://stackoverflow.com/questions/33669619/how-to-test-side-effect-of-the-method-which-raises-error
    it 'rolls back the transaction if the db fails to save' do
      expect {
        List.create_list(User.new, arg_words, real_list) rescue nil
      }.not_to change { List.count }
    end
  end
end
