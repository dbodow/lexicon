# this password digest will respond to 'password' via BCrypt
FactoryBot.define do
  factory :user do
    username "gStein"
    points 2300
    password_digest "$2a$10$VcMWUQPL0M81JEDwZOrx2.0aQuyBsAQ1IQPXUbmmPAV3vQ4s89yK2"
    session_token 'O8fDG4NKQqiBu-ED8nkvkQ'
  end
end
