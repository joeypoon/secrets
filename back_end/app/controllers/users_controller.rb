class UsersController < ApplicationController

  def create
    @user = User.create user_params
    @user.name = Faker::Commerce.color
    @user.token = SecureRandom.hex(7)
    if @user.save
      render :show, status: 201
    else
      render json: { error: 'Fail' }, status: 422
    end
  end

  def show
    @user = User.find_by email: user_params[:email]
  end

  private

    def user_params
      params.require(:user).permit(:email, :password, :password_confirmation)
    end

end
