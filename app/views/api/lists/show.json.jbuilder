json.partial! 'api/lists/lists', lists: @list
json.partial! 'api/words/words', words: @list.first.words
json.partial! 'api/words/examples', examples: @list.first.examples
json.partial! 'api/words/definitions', definitions: @list.first.definitions
