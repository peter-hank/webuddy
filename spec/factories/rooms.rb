# frozen_string_literal: true
FactoryBot.define do
  factory :room do
    association :owner
    room_icon_id { '' }
    title { 'room title' }
  end
end
