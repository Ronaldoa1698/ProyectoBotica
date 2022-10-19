class DashboardSellerController < ApplicationController

  def index
    @products = Product.all
  end

  def show
    @product = Product.find(params(:id))
  end

  def CreateSales
    @productSale = Product.new(product_params)
    if(@product = true)
      @productSale.save
    end

  end

  private
  def product_params
      params.require(:product).permit(:name, :price, :quantity)
  end

end
