FactoryBot.define do
  factory :real_word, class: Word do
    word 'lexicon'
  end

  factory :old_word, class: Word do
    word 'ancient'
    updated_at Time.new(2000)
  end
end
