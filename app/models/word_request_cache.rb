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
    user = query.user

    word = Word.create_word(query_string)

    UserMailer.word_lookup_email(word, user) if word

    word # truthy if result found; falsy otherwise
  end

  def self.enqueue_query(query, user)
    return unless user.validation_status
    user_id = user.id
    cached_query = WordRequestCache.new(query: query, user_id: user_id)
    cached_query.save # TODO: is this sufficient? consider save! + error handling
  end
end
