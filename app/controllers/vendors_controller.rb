class VendorsController < ApplicationController

    skip_before_action :authorize, only: [:create, :show]


    def create
        vendor = User.vendors.create!(vendor_params)
        session[:user_id] = vendor.id
        render json: vendor, status: :created
    end

    def search
        # vendor = Vendor.all.paginate(page: params[:page], per_page: 2)
        # render json: vendor

        # search = User.vendors.where('users.companyName ILIKE ?', "%#{params[:query]}%")
        # render json: search
        # vendors = User.type
        vendors = User.where(foodType: params[:query])
        render json: vendors
    end

    def vendor_list
        vendor = Vendor.all.paginate(page: params[:page], per_page: 8)
        render json: vendor
    end

    def update
        vendor = Vendor.find_by(id: session[:user_id])
        vendor.update(vendor_params)
        render json: vendor
    end

    private

    def vendor_params
        params.permit(:id, :firstName, :lastName, :email, :password, :password_confirmation, :foodType, :companyName, :type, :featured_image)
    end

end
