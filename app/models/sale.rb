class Sale < ApplicationRecord
    has_many :sales_details
    belongs_to :client
    has_many :products, through: :sales_details
end
