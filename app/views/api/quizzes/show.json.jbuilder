json.entities do
  json.partial! 'api/words/words', words: [@solution]
  json.partial! 'api/words/examples', examples: @solution.examples
  json.partial! 'api/words/definitions', definitions: @solution.definitions
  json.partial! 'api/quizzes/quiz',
                correct: @correct_answer,
                wrong: @wrong_answers
end
json.session do
  json.currentUser do
    json.points @user.points
  end
end
