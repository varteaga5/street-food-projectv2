class VendorSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :firstName, :lastName, :foodType, :companyName, :type, :email, :password, :featured_image

  def featured_image

    rails_blob_url(object.featured_image, only_path: true) if object.featured_image.attached?

  end


end
