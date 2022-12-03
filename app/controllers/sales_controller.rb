class SalesController < ApplicationController
skip_before_action :verify_authenticity_token
	def index
		@sales = Sale.all
		render json: @sales
	end
	
	def create
		# create a new sale 
		@sale = Sale.create(
			total: params[:total], 
			cliente: params[:cliente])
		# create the sale details
		params[:products].each do |product|
			SalesDetail.create(
				quantity: product[:quantity],
				sale_id: @sale.id,
				product_id: product[:id],
				client_id: 1	
			)
		end
		render json: @sale
	end
end
