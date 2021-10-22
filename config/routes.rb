Rails.application.routes.draw do
  resources :events
  # get 'events/index'
  # get 'events/show'
  # get 'events/new'
  # get 'events/edit'
    # get 'pages/index'
    # root 'pages#index'
    post '/users',         to: 'users#create'
get '/users/:id(.:format)', to: 'users#show'
get '/users',          to: 'users#index'
   get '/eventsall/:user_id(.:format)/:id(.:format)', to: 'events#index'
   put '/eventsupdate/:id(.:format)',  to: 'events#update'
   delete '/eventdelete/:id(.:format)', to: 'events#destroy'
       post '/login',    to: 'sessions#create'
       post '/users/:id(.:format)/event', to:'events#create', :as => :user_event  
post '/logout',   to: 'sessions#destroy'
get '/logged_in', to: 'sessions#is_logged_in?'

resources :users, only: [:create, :show, :index] do 

 end
end
