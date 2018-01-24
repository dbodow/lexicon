require 'rails_helper'

RSpec.describe StaticPagesController do
  describe 'get #root' do
    subject(:root_req) { get :root }

    it 'renders the root html page' do
      expect(root_req).to render_template(:root)
    end
  end
end
