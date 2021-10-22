class EventsController < ApplicationController

  def create
    @user = User.find(params[:id])
    @event = @user.event
        @event = Event.new(event_params)
            if (@event.save)
                render json: {
                status: :created,
                event: @event
              
            }

           else 
               render json: {
               status: 500,
               errors: @event.errors.full_messages
           }
           end
     end
     def index
      @user = User.find(params[:id])
      @event = @user.event
      @event = Event.where(user_id:params[:user_id])
         if @event
            render json: {
            event: @event
         }
        else
            render json: {
            status: 500,
            errors: ['no users found']
        }
       end
      
  end
  def update

    @event = Event.find(params[:id])

    if @event.update(event_params)
      
    else
     
    end
  end

  def show
    @event = Event.all
  end
    
  def destroy 
    Event.destroy(params[:id])
  end


private
      
     def event_params
         params.require(:event).permit(:id, :title, :desc, :time, :user_id)
     end
     def event_params_update
        params.require(:event).permit(:id, :title, :desc, :time, :user_id)
    end

end
