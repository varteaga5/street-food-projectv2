class VendorSerializer < ActiveModel::Serializer
  attributes :id, :firstName, :lastName, :foodType, :companyName, :type, :email, :password

end
