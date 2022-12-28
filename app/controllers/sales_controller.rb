class SalesController < ApplicationController
  skip_before_action :authenticate_user!
  skip_before_action :verify_authenticity_token
  require 'pdfkit'

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
  #metodo para ver sales details 
  def showSaleDetails
    @sale = Sale.find(params[:id])
    @sale_details = SalesDetail.where(sale_id: @sale.id)
    if @sale.nil?
      render json: { error: "Sale not found" }, status: :unprocessable_entity and return
    else
      render json: @sale_details
    end
  end

  #metodo para descargar pdf de la factura de la venta mediante el id de la venta 
  def show_pdf_template
    @sale = Sale.includes(sales_details: :product).find(params[:id])
    if @sale.nil?
      render json: { error: "Sale not found" }, status: :unprocessable_entity and return
    else
      html = render_to_string(template: "sales/show_pdf_template", layout: false, locals: { sale: @sale }, formats: [:html])
      kit = PDFKit.new(html, :page_size => 'Letter')
      send_data(kit.to_pdf, :filename => 'factura.pdf', :type => 'application/pdf')
    end
  end
end
