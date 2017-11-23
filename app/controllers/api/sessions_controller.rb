class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(user_params[:username],
                                     user_params[:password])
    if @user
      login!(@user)
      render 'api/users/show'
    else
      render json: ['Invalid username and password.'], status: 401
    end
  end

  def destroy
    logout! if logged_in?
    render json: {}
  end

  private

  def user_params
    params.require(:user).permit(:username, :password)
  end
end
