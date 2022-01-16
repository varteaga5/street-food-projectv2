class MenusController < ApplicationController

       
        def index
            render json: Menu.find_by(id: params[:id])
        end

        def create
            new_item = @current_user.menus.create!(menu_params)
            render json: new_item, status: :created
        end

        def show_by_name
            vendor = Menu.where(companyName: params[:companyName])
            render json: vendor
        end

        def show
            render json: find_vendor_menu
        end
    
        def update
            item = Menu.find_by(id: params[:id])
            item.update(menu_params)
            render json: @current_user.menus
        end
        
        def destroy
            item = Menu.find_by(id: params[:id])
            item.destroy
            render json: @current_user.menus
        end
        
        private
        
        def menu_params
            params.permit(:companyName, :foodName, :foodDesc, :price )
        end
        
        def find_vendor_menu
            @vendor = Menu.where(user_id: params[:id])
        end
        
        def render_menu
            render json: @current_user.menus
        end
end
