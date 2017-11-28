class ListsController < ApplicationController

  def index
  end

  def show
  end

  def create
    @list = List.new(list_params)
    if @list.save
      render :show
    else
      render json: @list.errors.full_messages, status: 422
    end
  end

  def destroy
    @list = List.find_by(id: params[:id])
    @list.destroy if @list
  end

  def patch
    # patch is only used to toggle activation for inital release
    @list = List.find_by(id: params[:id])
    toggle_active_status
    render :show
  end

  private

  def list_params
    params.require(:list).permit(:title, :description, :active)
  end

  def toggle_active_status
    @list.active = !@list.active
  end
end
