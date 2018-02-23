class ApplicationMailer < ActionMailer::Base
  default from: 'lexiconly.heroku.app@gmail.com'
  layout 'mailer'

  HOST_URL = (ENV['HOST_URL'] || 'http://localhost:3000').freeze
end
