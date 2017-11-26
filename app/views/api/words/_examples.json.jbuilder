json.examples do
  examples.each do |example|
    json.partial! '/api/words/example', example: example
  end
end
