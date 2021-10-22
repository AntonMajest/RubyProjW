class Event < ApplicationRecord
    belongs_to :user, optional: true
    validates :title, presence: true
    validates :desc, presence: true
    validates :time, presence: true
    validates :user_id, presence: true
end
