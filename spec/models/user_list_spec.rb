require 'rails_helper'

RSpec.describe UserList do
  subject(:ul) { build(:user_list) }

  describe('validations and associations') do
    it { should validate_presence_of(:list_id) }
    it { should validate_presence_of(:user_id) }
    it { should validate_uniqueness_of(:list_id).scoped_to(:user_id) }
    it { should belong_to(:user) }
    it { should belong_to(:list) }
  end
end
