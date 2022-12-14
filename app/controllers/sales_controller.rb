class SalesController < ApplicationController
  skip_before_action :authenticate_user!
  skip_before_action :verify_authenticity_token

  def index
    @sales = Sale.all
    render json: @sales
  end

  def create
    if params[:products].empty?
      render json: { error: "No products" }, status: :unprocessable_entity and return
    end 

    @sale = Sale.create(
      total: params[:total],
      client_id: params[:client_id],
    )

    # create the sale details
  
    params[:products].each do |product|
      SalesDetail.create(
        quantity: product[:quantity],
        sale_id: @sale.id,
        product_id: product[:id],
      )
    end

    render json: @sale
	end

  def download_pdf
    @sale = Sale.find(params[:id])
    pdf = Prawn::Document.new
    pdf.text "Factura Nro: #{params[:id]}"
    pdf.text "Fecha: #{Time.now.strftime("%d/%m/%Y")}"
    pdf.text "Cliente: #{Client.find(@sale.client_id).name}"
    pdf.text "Total: #{params[:total]}"
    pdf.text "Productos: " 
    params[:products].each do |product|
      pdf.text "#{product[:name]} - #{product[:quantity]}"
    end
    send_data(pdf.render, filename: "factura.pdf", 
    type: "application/pdf", 
    disposition: "inline")
  end

end
