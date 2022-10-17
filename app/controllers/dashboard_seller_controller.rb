class DashboardSellerController < ApplicationController

  def index
    @products = Product.all
  end

  def show
    @product = Product.find(params(:id))
  end

  def load_cart

    @cart = Product.find()

  end


end
