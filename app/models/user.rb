class User < ApplicationRecord
  validates :username, :password_digest, :session_token, :points, presence: true
  validates :username, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }

  has_many :userlists
  has_many :lists,
           through: :userlists,
           source: :list
  has_many :words,
           through: :lists,
           source: :words

  attr_reader :password
  after_initialize :ensure_default_values

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil unless user && user.is_password?(password)
    user
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64
    self.save
    self.session_token
  end

  def is_password?(password)
    BCrypt::Password.new(password_digest).is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end


  private

  def ensure_default_values
    self.session_token ||= SecureRandom.urlsafe_base64
    self.points ||= 0
  end
end
