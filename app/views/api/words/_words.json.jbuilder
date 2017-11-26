json.words do
  words.each do |word|
    json.partial! '/api/words/word', word: word
  end
end
