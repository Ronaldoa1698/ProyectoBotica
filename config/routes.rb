Rails.application.routes.draw do

  resources :products
  resources :sales, only: [:create]
 
  # get 'dashboard_seller/index'
  get 'dashboard_seller', to: 'dashboard_seller#index'
  root 'home#index'
  devise_for :users

  namespace :admin do
    resources :suppliers, :products, :categories
    root 'suppliers#index'
  end

end
