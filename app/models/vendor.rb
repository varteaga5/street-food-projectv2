class Vendor < User
    has_one_attached :featured_image

    belongs_to :user, optional: true

    # validates :companyName, presence: true, uniqueness: true

end

