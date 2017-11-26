class Credential
  def self.wordnik_api_key
    Rails.application.secrets.wordnik_api_key
  end
end
