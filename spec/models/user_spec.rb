require 'rails_helper'

RSpec.describe User do
  subject(:user) { build(:user) }
  describe 'validations and associations' do
    it { should validate_presence_of(:username) }
    it { should validate_presence_of(:password_digest) }
    it { should validate_presence_of(:session_token) }
    it { should validate_presence_of(:points) }
    it { should validate_uniqueness_of(:username) }
    it { should validate_length_of(:password).is_at_least(6) }
    it { should allow_value(nil).for(:password) }
    it { should have_many(:user_lists).dependent(:destroy) }
    it { should have_many(:lists) }
    it { should have_many(:words) }
  end

  context 'when setting passwords' do
    it 'does not save passwords to the database' do
      User.create!(username: 'tsEliot', password: 'password')
      user = User.find_by_username('tsEliot')
      expect(user.password).not_to be('password')
    end

    it 'encrypts the password using BCrypt' do
      expect(BCrypt::Password).to receive(:create)
      User.new(username: 'tsEliot', password: 'password')
    end
  end

  context 'after initializing the model' do
    it 'assigns a session_token if one is not given' do
      eliot = User.create(username: 'tsEliot', password: 'password')
      expect(eliot.session_token).not_to be_nil
    end
  end
end
