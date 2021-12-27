class CustomersController < ApplicationController
    skip_before_action :authorize, only: :create

    def create
        customer = Customer.create!(customer_params)
        session[:user_id] = customer.id
        render json: customer, status: :created
    end

    def update
        vendor = Customer.find_by(id: session[:user_id])
        vendor.update(update_params)
        render json: vendor
    end

    private

    def customer_params
        params.permit(:firstName, :lastName, :email, :password, :password_confirmation, :favFood)
    end

    def update_params
        params.require(:customer).permit(:id, :firstName, :lastName, :email, :password, :favFood)
    end

end

