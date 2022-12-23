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
      pdf.text "Factura de venta"
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

  def download_prueba
    pdf = Prawn::Document.new
    pdf.text "Hello World"
    send_data(pdf.render, filename: "hello.pdf", type: "application/pdf")
  end


  def download_pdf_pdfkit
    @sale = Sale.includes(sales_details: :product).find(params[:id])
    if @sale.nil?
      render json: { error: "Sale not found" }, status: :unprocessable_entity and return
    else
      html_sale = "<p>Factura de venta</p>"
      html_sale += "<p>Cliente: " + @sale.client.name + "</p>"
      html_sale += "<p>Fecha: " + @sale.created_at.to_s + "</p>"
      html_sale += "<p>Productos: </p>"
      @sale.sales_details.each do |sale_detail|
        html_sale += "<p>Producto: " + sale_detail.product.name + " Cantidad: " + sale_detail.quantity.to_s + "</p>"
      end
      html_sale += "<p>Total: " + @sale.total.to_s + "</p>"
      kit = PDFKit.new(html_sale, :page_size => 'Letter')
      send_data(kit.to_pdf, :filename => 'factura.pdf', :type => 'application/pdf')
   end
  end

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
