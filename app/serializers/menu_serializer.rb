class MenuSerializer < ActiveModel::Serializer
  attributes :id, :companyName, :foodName, :foodDesc, :price

  # belongs_to :user
end
