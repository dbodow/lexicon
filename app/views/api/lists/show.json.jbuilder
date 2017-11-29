json.partial! 'api/lists/lists', lists: @list
json.partial! 'api/words/words', words: @list.first.words
