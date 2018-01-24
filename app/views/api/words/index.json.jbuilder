parsed_results = []
@query_results['searchResults'].each do |result|
  parsed_results << result['word'] unless result['count'] == 0
end

json.array!(parsed_results)
