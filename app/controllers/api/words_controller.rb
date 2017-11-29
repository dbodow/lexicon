class Api::WordsController < ApplicationController
  def index
    # sleep(0.5) # simulate network latency
    sleep(0.2) # rate limit abusive use
    begin
      @query_results = Word.query_wordnik(params[:query])
    rescue
      @query_results = { 'type' => 'error', 'message' => 'Wordnik API failed - check server logs' }
    end
    if @query_results.key?('type') && @query_results['type'] == 'error'
      render json: [params[:query]], status: 422
      return
    end
    unless @query_results['totalResults'] > 0
      render json: [params[:query]], status: 404
      return
    end
    render json: parseQueryResults
  end

  def show
    # sleep(0.5) # simulate network latency
    sleep(0.2) # rate limit abusive use
    @word = Word.find_by_word(params[:word])
    unless @word
      render json: ["You searched for #{params[:word]}. Perhaps the word was misspelled?"], status: 404
      return
    end
    render :show
  end

  private

  def parseQueryResults
    parsed_results = []
    @query_results['searchResults'].each do |result|
      parsed_results << result['word'] unless result['count'] == 0
    end
    parsed_results
  end
end
