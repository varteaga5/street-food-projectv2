class FavVendor < ApplicationRecord
    belongs_to :customer, optional: true
end
