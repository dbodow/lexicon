json.partial! 'api/words/words', words: [@word]
json.partial! 'api/words/examples', examples: @word.examples
json.partial! 'api/words/definitions', definitions: @word.definitions
