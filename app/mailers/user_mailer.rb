class UserMailer < ApplicationMailer
  def verification_email(user)
    @user = user

    @user.validation_uri = SecureRandom.urlsafe_base64
    @user.save!

    @confirm_url = HOST_URL + '/verification/' + @user.validation_uri
    mail(to:      @user.email,
         subject: '[Email Verification Needed] Welcome to Lexicon')
  end

  def word_lookup_email(word, user)
    @user, @word = user, word
    @lookup_url = HOST_URL + '/#/lookup/' + word.word

    mail(to:      @user.email,
         subject: "We found your word: #{@word.word}")
      .deliver!
  end
end
