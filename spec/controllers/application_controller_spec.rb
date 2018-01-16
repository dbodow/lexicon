require 'rails_helper'

RSpec.describe ApplicationController do
  subject(:ac) { ApplicationController.new }

  describe 'CSRF protection' do
    it 'protects from forgery' do
      expect(ac.forgery_protection_strategy).not_to be nil
    end
  end
end
