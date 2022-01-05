class Vendor < User
    belongs_to :user, optional: true

    validates :companyName, presence: true, uniqueness: true
    validates :foodType, presence: true

    # def self.query(rcvdQuery)
    #     # can call without House in front of where because of self.
    #     # uses wildcard symbol %
    #     where("users.foodType LIKE (?)", "%#{rcvdQuery}%")
    #   end
    

end

