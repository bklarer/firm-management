class Api::UsersController < ApplicationController
    skip_before_action :authorize, only: [:create, :index]

    def index
     users = User.all
     render json: users
    end
    

    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    def show
        render json: @current_user, serializer: LoggedInUserSerializer
    end

    def destroy
        user = @current_user
        user.destroy
        head :no_content
    end

    private

    def user_params
        params.permit(:username, :password, :password_confirmation, :first_name, :last_name, :email)
    end
    
end
