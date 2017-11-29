class Api::ListsController < ApplicationController
  def initialize
    super
    @words = []
  end

  def index
    @lists = current_user.lists.includes(:list_words)
    render :index
  end

  def show
    @list = List.includes(:list_words).includes(:words).where(id: params[:id])
    if @list.empty?
      render json: ["list not found"], status: 404
    else
      render :show
    end
  end

  def create
    @list = List.new(list_params)
    if List.create_list(current_user, param_words[:words], @list)
      # grab associated data for jbuilder
      @list = List.includes(:list_words).includes(:words).where(id: @list.id)
      render :show
    else
      render json: ["list creation failed"], status: 422
    end
  end

  def destroy
    @list = List.find_by(id: params[:id])
    @list.destroy if @list
  end

  def patch
    # patch is only used to toggle activation for inital release
    @list = List.find_by(id: params[:id])
    unless @list
      render json: ["list not found"], status: 404
      return
    end
    toggle_active_status
    render :show
  end

  private

  def list_params
    params.require(:list).permit(:title, :description, :active)
  end

  def param_words
    params.require(:list).permit(words: [])
  end

  def toggle_active_status
    @list.active = !@list.active
  end
end
