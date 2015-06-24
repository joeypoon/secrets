class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session

  def find_user_by_token
    User.find_by token: params[:token]
  end

  def find_user_by_email
    User.find_by email: params[:email]
  end

end
