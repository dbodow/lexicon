require 'exceptions'

class Api::WordsController < ApplicationController
  include Exceptions

  def index
    limit_request_rate
    get_query_results

    # Handle errors
    if @query_results.key?('type') && @query_results['type'] == 'error'
      render :index_error, status: 422
      return
    end

    # Handle no results
    unless @query_results['totalResults'] > 0
      render :index_error, status: 404
      return
    end

    render :index
  end

  def show
    limit_request_rate
    @word = Word.find_by_word(params[:word])

    # Handle no results
    unless @word
      render :show_error, status: 404
      return
    end

    render :show
  rescue Exceptions::ExternalApiError
    WordRequestCache.enqueue_query(query, user)
  end

  private

  def get_query_results
    @query_results = Word.query_wordnik(params[:query])
  rescue(StandardError)
    @query_results = {
      'type' => 'error',
      'message' => 'Wordnik API failed - check server logs'
    }
  end
end
