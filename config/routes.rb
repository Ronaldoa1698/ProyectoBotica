Rails.application.routes.draw do
  resources :items
  resources :clients
  resources :products 
  
  get 'show_pdf_template/:id', to: 'sales#show_pdf_template', as: 'show_pdf_template'
  resources :sales 
  # get 'dashboard_seller/index'
  get 'dashboard_seller', to: 'dashboard_seller#index'
  root 'home#index'
  devise_for :users

  namespace :admin do
    resources :suppliers, :products, :categories
    root 'suppliers#index'
  end

end
