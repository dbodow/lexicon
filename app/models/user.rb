class User < ApplicationRecord
  validates :username, :password_digest, :session_token, :points,
            :email, presence: true
  validates :username, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }

  has_many :user_lists,
           dependent: :destroy

  has_many :lists,
           through: :user_lists,
           source: :list

  has_many :words,
           through: :lists,
           source: :words

  has_many :word_request_caches,
           dependent: :destroy

  attr_reader :password # TODO: test removal of this line

  after_initialize :ensure_default_values
  after_create :send_verification_email

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

  def increment_points(amount)
    self.points += amount
    self.save
  end

  def verify!
    self.validation_status = true
    self.save!
  end

  private

  def ensure_default_values
    self.session_token ||= SecureRandom.urlsafe_base64
    self.points ||= 0
  end

  def send_verification_email
    UserMailer.verification_email(self).deliver_now
  end
end
