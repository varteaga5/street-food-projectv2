class FavVendorSerializer < ActiveModel::Serializer
  attributes :id, :firstName, :lastName, :email, :foodType, :companyName, :user_id, :imgurl
  
    # belongs_to :user

end
