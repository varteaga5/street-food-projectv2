class CustomerSerializer < ActiveModel::Serializer
  attributes :id, :firstName, :lastName, :favFood, :type, :email#, :fav_vendors

  # has_many :fav_vendors

end
