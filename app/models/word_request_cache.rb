class WordRequestCache < ApplicationRecord
  validates :query, presence: true, uniqueness: { scope: [:user_id] }

  belongs_to :user

  def self.process_queued_queries
    return 'Wordnik is down' unless Wordnik.api_available?

    successful_lookups = []

    WordRequestCache.includes(:users).all.each do |query|
      lookup_was_success = WordRequestCache.process_query(query)
      successful_lookups << query if lookup_was_success
    end

    successful_lookups.each(&:destroy)
  end

  def self.process_query(query)
    query_string = query.query
    username = query.user.username

    word = Word.create_word(query_string)

    WordRequestCache.send_email(word, username) if word

    word # truthy if result found; falsy otherwise
  end

  def self.enqueue_query(query)
    user_id = current_user.id
    cached_query = WordRequestCache.new(query: query, user_id: user_id)
    cached_query.save # TODO: is this sufficient? consider save! + error handling
  end

  def self.send_email(word, email); end
end
