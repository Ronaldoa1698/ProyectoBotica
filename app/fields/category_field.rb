require "administrate/field/base"

class CategoryField < Administrate::Field::Base
  def to_s
    data.name
  end
end
