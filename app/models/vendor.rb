class Vendor < User
    belongs_to :user, optional: true

    validates :companyName, presence: true, uniqueness: true
    validates :foodType, presence: true

end

