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
    @user = find_user_by_email
    if @user.authenticate user_params[:password]
      render :show, status: 200
    else
      render json: { invalid: 'Incorrect email/password combination' }, status: 401
    end
  end

  private

    def show
    end

    def user_params
      params.require(:user).permit(:email, :password, :password_confirmation)
    end

end
