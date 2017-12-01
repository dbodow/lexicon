require 'wordnik'
require 'datamuse'

class Api::QuizzesController < ApplicationController
  def create
    current_user.increment_points(100) if params[:correct] == "true"
    @solution = current_user.words.where('lists.active' => true).sample
    @correct_answer = Datamuse.new.fetch_top_synonym(@solution.word)['word']
    @wrong_answers = fetch_random_wrong_answers(@correct_answer)
    @user = current_user
    render :show
  end

  private

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

  def quiz_params
    # reserved for word mastery tracking bonus feature
  end
end
