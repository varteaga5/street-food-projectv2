class User < ApplicationRecord
    scope :customers, -> {where(type: 'Customer')} # User.friends
    scope :vendors, -> {where(type: 'Vendor')}

    has_secure_password

    has_many :customers, class_name: 'Customer'
    has_many :vendors, class_name: 'Vendor'
    has_many :fav_vendors
    has_many :menus

    validates :firstName, presence: true
    validates :lastName, presence: true
    validates :email, presence: true, uniqueness: true
    validates :password_digest, presence: true

end
