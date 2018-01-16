require 'rails_helper'

RSpec.describe ListWord do
  subject(:lw) { build(:list_word) }

  describe('validations and associations') do
    it { should validate_presence_of(:list_id) }
    it { should validate_presence_of(:word_id) }
    it { should validate_uniqueness_of(:word_id).scoped_to(:list_id) }
    it { should belong_to(:word) }
    it { should belong_to(:list) }
  end
end
