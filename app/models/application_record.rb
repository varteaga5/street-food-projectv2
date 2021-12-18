class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def customer?
    type == 'Customer'
  end

  def seller?
    type == 'Seller'
  end
  
end
