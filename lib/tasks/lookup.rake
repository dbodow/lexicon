namespace :lookup do
  desc "Process cached word lookup requests queued during a Wordnik API failure"
  task failed_words: :environment do
    puts "Attempting to process queued queries..."
    WordRequestCache.process_queued_queries
  end
end
