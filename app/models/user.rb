class User < ApplicationRecord
    has_many :event
    has_secure_password
    validates :username, presence: true
    validates :email, uniqueness: true
    validates :password, length: { minimum: 4 }
end