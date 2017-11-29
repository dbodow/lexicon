Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create]
    resource :session, only: [:create, :destroy]

    resources :words, param: :word, only: [:index, :show]
    resources :lists, only: [:index, :show, :create, :destroy, :update]
  end

  root to: 'static_pages#root'
end
