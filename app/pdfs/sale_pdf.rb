class SalePdf < Prawn::Document

    def initialize(sale)
        super(top_margin: 70)
        @sale = sale
        prueba
        line_items
    end
    def prueba
        text "hola", size: 20, style: :bold
    end

    def line_items
        move_down 20
        table [[1,2], [3,4]]
    end

end