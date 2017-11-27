class Api::WordsController < ApplicationController
  def index
    @query_results = Word.query_wordnik(params[:query])
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
    @word = Word.find_by(word: params[:word]) || create_word(params[:word])
    unless @word
      render json: ["You searched for #{params[:word]}. Perhaps the word was misspelled?"], status: 404
      return
    end
    render :show
  end

  private

  def create_word(word)
    # check that the word exists
    definitions = Word.fetch_definitions(word)
    return false if definitions.empty?
    # build word, definitions, and examples
    new_word = Word.create(word: word)
    word_id = new_word.id
    examples = Word.fetch_examples(word)['examples']
    create_definitions(definitions, word_id)
    create_examples(examples, word_id)
    new_word
  end

  def create_definitions(definitions, word_id)
    definitions.each do |result|
      definition = result['text']
      attribution = result['attributionText']
      pos = result['partOfSpeech']
      Definition.create({definition: definition, attribution: attribution,
                        pos: pos, word_id: word_id})
    end
  end

  def create_examples(examples, word_id)
    examples.each do |result|
      example = result['text']
      example_source = result['title']
      Example.create(example: example, example_source: example_source,
                     word_id: word_id)
    end
  end

  def parseQueryResults
    parsed_results = []
    @query_results['searchResults'].each do |result|
      parsed_results << result['word'] unless result['count'] == 0
    end
    parsed_results
  end
end
