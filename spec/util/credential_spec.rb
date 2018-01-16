require 'rails_helper'

RSpec.describe(Credential) do
  it 'stores a Wordnik API key' do
    expect(Credential.wordnik_api_key).not_to be_nil
  end
end
