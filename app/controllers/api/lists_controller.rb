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
    load_list(params[:id])
    if @list.empty?
      render :show_error, status: 404
    else
      render :show
    end
  end

  def create
    @list = List.new(list_params)
    if List.create_list(current_user, words_params[:words], @list)
      load_list(@list.id)
      render :show
    else
      render :create_error, status: 422
    end
  end

  def destroy
    @list = List.find_by(id: params[:id])
    @list.destroy if @list
  end

  def update
    load_list(params[:id])
    if @list.empty?
      render :show_error, status: 404
      return
    end
    toggle_active_status
    render :show
  end

  private

  # grabs the list and preloads associated data for JBuilder; no n+1!
  def load_list(id)
    @list = List.includes(:words)
      .includes(:definitions)
      .includes(:examples)
      .where(id: id)
  end

  def list_params
    params.require(:list).permit(:title, :description, :active)
  end

  def words_params
    params.require(:list).permit(words: [])
  end

  def toggle_active_status
    @list.first.active = !@list.first.active
    @list.first.save
  end
end
