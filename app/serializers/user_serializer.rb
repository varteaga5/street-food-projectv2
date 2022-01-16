class UserSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :featured_image

  def featured_image
    if object.featured_image.attached?
      {
        url: rails_blob_url(object.featured_image)
      }
    end
  end

end
