class FavVendorSerializer < ActiveModel::Serializer
  attributes :id, :firstName, :lastName, :email, :foodType, :companyName, :user_id
  
    # belongs_to :user

end
