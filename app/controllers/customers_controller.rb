class CustomersController < ApplicationController
    skip_before_action :authorize, only: :create

    def create
        customer = Customer.create!(customer_params)
        session[:user_id] = customer.id
        render json: customer, status: :created
    end

    private

    def customer_params
        params.permit(:firstName, :lastName, :email, :password, :password_confirmation, :favFood)
    end
end

