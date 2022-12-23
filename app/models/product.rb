class Product < ApplicationRecord
  belongs_to :category
  has_many :sales_details
  has_many :sales, through: :sales_details
end
