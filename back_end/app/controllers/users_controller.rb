class UsersController < ApplicationController

  def create
    @user = User.create user_params
    @user.name = Faker::Team.creature + SecureRandom.hex(2)
    @user.token = SecureRandom.hex(8)
    if @user.save
      render :show, status: 201
    else
      render json: { error: 'Fail' }, status: 422
    end
  end

  def login
    if set_user.authenticate user_params[:password]
      render :show, status: 200
    else
      render json: { invalid: 'Incorrect email/password combination' }, status: 401
    end
  end

  private

    def show
      set_user
    end

    def set_user
      @user = User.find_by email: user_params[:email]
    end

    def user_params
      params.require(:user).permit(:email, :password, :password_confirmation)
    end

end
