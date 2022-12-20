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
  def download_pdf
    @sale = Sale.includes(:sales_details).find(params[:id])
    if @sale.nil?
      render json: { error: "Sale not found" }, status: :unprocessable_entity and return
    else
      pdf = Prawn::Document.new
      pdf.text "Factura de venta", size: 20, style: :bold, align: :center, color: "FF0000",underline: true,leading: 10, character_spacing: 5
      pdf.text "Cliente: " + @sale.client.name
      pdf.text "Fecha: " + @sale.created_at.to_s
      pdf.text "Productos: "
      @sale.sales_details.each do |sale_detail|
        pdf.text "Producto: " + sale_detail.product.name + " Cantidad: " + sale_detail.quantity.to_s
      end
      pdf.text "Total: " + @sale.total.to_s
      send_data pdf.render, filename: 'factura.pdf', type: 'application/pdf', disposition: "inline"
    end
  end

  #metodo para descargar pdf de prueba
  def download_prueba
    @sale = Sale.find(params[:id])
    respond_to do |format|
      format.html
      format.pdf do
        pdf = SalePdf.new(@sale)
        send_data pdf.render, filename: 'prueba.pdf', type: 'application/pdf', disposition: "inline"
        end
    end
  end
end
