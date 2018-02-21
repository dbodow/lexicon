class ApplicationMailer < ActionMailer::Base
  default from: 'lexiconly.heroku.app@gmail.com'
  layout 'mailer'

  def host_url
    ENV['HOST_URL'] || 'http://localhost:3000'
  end
end
