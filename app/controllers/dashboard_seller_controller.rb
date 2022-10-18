class DashboardSellerController < ApplicationController

  def index
    @products = Product.all
  end

  def showProducts
    @product = Product.find(params(:id))
  end


end
