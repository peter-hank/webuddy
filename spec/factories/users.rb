# frozen_string_literal: true
FactoryBot.define do
  factory :user do
    avatar_id { '' }
    username { 'username' }
    email { 'example@gmail.com' }
  end
end
