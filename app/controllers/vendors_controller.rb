class VendorsController < ApplicationController

    skip_before_action :authorize, only: [:create, :show]

    # search = Vendor.query(params[:query])
    # search = User.vendors.query(params[:query])
    # search = Vendor.query(params[:query])
    # search = Vendor.query(params[:query])
    # search = Vendor.query(params[:query])

    def search
        search = Vendor.query(params[:query])
        render json: search
    end

    def create
        vendor = User.vendors.create!(vendor_params)
        session[:user_id] = vendor.id
        render json: vendor, status: :created
    end

    def vendor_list
        vendor = Vendor.all.paginate(page: params[:page], per_page: 8)
        render json: vendor
    end

    def update
        vendor = Vendor.find_by(id: session[:user_id])
        vendor.update(update_params)
        render json: vendor
    end

    private

    def vendor_params
        params.permit(:id, :firstName, :lastName, :email, :password, :password_confirmation, :foodType, :companyName, :type, :imgurl)
    end

    def update_params
        # params.permit(:id, :firstName, :lastName, :email, :password, :companyName, :foodType,  :imgurl)
        params.require(:vendor).permit(:id, :firstName, :lastName, :email, :password, :companyName, :foodType,  :imgurl)
    end

end
