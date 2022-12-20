class SalePdf < Prawn::Document

    def initialize(sale)
        super(top_margin: 70)
        @sale = sale
        prueba
        
    end
    def prueba
        text "hola", size: 20, style: :bold
    end



end