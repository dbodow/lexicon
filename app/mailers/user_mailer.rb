class UserMailer < ApplicationMailer
  def verification_email(user)
    @user = user

    @user.validation_uri = SecureRandom.urlsafe_base64
    @user.save!

    @confirm_url = host_url + '/verification/' + @user.validation_uri
    mail(to: user.email, subject: '[Email Verification Needed] Welcome to Lexicon')
  end

  def queued_lookup_email(user)

  end
end
