class Credential
  def self.wordnik_api_key
    Rails.application.secrets.wordnik_api_key
  end

  def self.gmail_password
    Rails.application.secrets.gmail_password
  end
end
