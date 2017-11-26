json.definitions do
  definitions.each do |definition|
    json.partial! '/api/words/definition', definition: definition
  end
end
