# word_ids = [3, 4, 9]
word_ids = list.list_words.map(&:word_id)

json.set! list.id do
  json.id list.id
  json.title list.title
  json.description list.description
  json.words word_ids
  json.active list.active
end
