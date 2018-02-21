class StaticPagesController < ApplicationController
  def root; end

  def email_verification
    @user = User.find_by(validation_uri: params[:validation_uri])
    if @user
      @user.verify!
      render :verification_success
    else
      render :verification_failure
    end
  end

  private

  def verification_params
    params.permit(:validation_uri)
  end
end
