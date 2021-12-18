class Customer < User
    belongs_to :user, optional: true
    # has_many :fav_vendors


    validates :favFood, presence: true

end
