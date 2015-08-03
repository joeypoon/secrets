Rails.application.routes.draw do
  post '/login' => 'users#login'
  resources :users, only: [:create]
  resources :posts, only: [:index, :create]
end
