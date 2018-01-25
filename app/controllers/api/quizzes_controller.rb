require 'wordnik'
require 'datamuse'

class Api::QuizzesController < ApplicationController
  def create
    # Reward users who got the last question correct
    current_user.increment_points(100) if params[:correct] == "true"
    @user = current_user # allows points to be updated in the response

    # Load a solution word
    @solution = random_active_list_word
    ensure_solution_exists # in case there are no active lists

    # create answer choices
    @correct_answer = fetch_correct_answer
    @wrong_answers = fetch_random_wrong_answers(@correct_answer)

    render :show
  end

  private

  def random_active_list_word
    current_user.words.where('lists.active' => true).sample
  end

  def fetch_correct_answer
    Word.fetch_top_synonym(@solution.word)['word']
  end

  def fetch_random_wrong_answers(correct_answer_str)
    wrong_answers = []
    # collisions are rare, but fetching extra random words doesn't
    # require an additional api call, so fetch one extra word in case
    # of collision. API returns unique words, so dual collisions
    # are impossible.
    Word.fetch_random_words(4).each do |str_word|
      unless correct_answer_str == str_word
        wrong_answers << str_word
      end
      break if wrong_answers.length >= 3
    end
    wrong_answers
  end

  def ensure_solution_exists
    # picks a random word for the quiz solution
    @solution ||= Word.create_word(Word.fetch_random_words(1).first)
  end
end
