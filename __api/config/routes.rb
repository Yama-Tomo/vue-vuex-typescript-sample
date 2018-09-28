Rails.application.routes.draw do
  scope :api, defaults: {format: :json} do
    devise_for :users, controllers: {sessions: 'sessions'}
    devise_scope :user do
      get 'users/show', to: 'sessions#show'
    end
  end
end
