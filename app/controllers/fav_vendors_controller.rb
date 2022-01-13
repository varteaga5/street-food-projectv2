class FavVendorsController < ApplicationController
   
    skip_before_action :authorize, only: :create

    def index
        fav_vend = @current_user.fav_vendors
        render json: fav_vend
    end

    def create
        fav_vend = FavVendor.create(ven_params)
        render json: fav_vend
    end

    def show
        fav_vend = @current_user.fav_vendors
        render json: fav_vend
    end

    def destroy
        vend = FavVendor.find_by(id: params[:id])
        vend.destroy
        render json: @current_user.fav_vendors
    end

    private
    
    def ven_params
        params.permit(:firstName, :lastName, :email, :foodType, :companyName, :user_id, :imgurl)
    end
end
