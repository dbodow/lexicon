class WordRequestCache < ApplicationRecord
  validates :query, presence: true, uniqueness: { scope: [:user_id] }

  belongs_to :user

  def self.process_queued_queries
    return 'Wordnik is down' unless Wordnik.api_available?

    lookups = []

    WordRequestCache.includes(:user).all.each do |query|
      WordRequestCache.process_query(query)
      lookups << query
    end

    lookups.each(&:destroy)
  end

  def self.process_query(query)
    query_string = query.query
    user = query.user

    word = Word.find_by_word(query_string)

    UserMailer.word_lookup_email(word, user).deliver_now if word

    word # truthy if result found; false otherwise
  end

  def self.enqueue_query(query, user)
    return unless user.validation_status
    cached_query = WordRequestCache.new(query: query, user_id: user.id)
    cached_query.save # TODO: is this sufficient? consider save! + error handling
  end
end
