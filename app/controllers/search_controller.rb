class SearchController < ApplicationController
  def new
  end

  def create
    @results = Product.where('name LIKE ?', "%#{params[:query]}%").limit(10)
    render :new
  end
end
