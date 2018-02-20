namespace :cleanup do
  desc "Removes words from the database if unaccessed for 30 days"
  task old_words: :environment do
    puts 'Removing old words from database...'
    Word.cleanup_unused_words
    puts 'Cleanup finished!'
  end
end
