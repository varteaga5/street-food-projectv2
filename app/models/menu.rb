class Menu < ApplicationRecord
    # belongs_to :user, optional: true

    

    validates :companyName, :presence => true
    validates :foodName, :presence => true
    validates :foodDesc, :presence => true
    validates :price, :presence => true


end
