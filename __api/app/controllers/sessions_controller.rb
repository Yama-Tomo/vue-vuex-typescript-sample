class SessionsController < Devise::SessionsController
  respond_to :json

  before_action :verify_authentication, only: [:show]

  def show
    render json: { :user => { id: current_user.id, email: current_user.email } }
  end

  def verify_authentication
    unless user_signed_in?
      render json: { error: 'forbidden' }, status: 403
      return false
    end
  end
end