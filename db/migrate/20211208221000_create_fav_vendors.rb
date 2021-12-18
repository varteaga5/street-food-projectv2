class CreateFavVendors < ActiveRecord::Migration[6.1]
  def change
    create_table :fav_vendors do |t|
      t.belongs_to :user, null: false, foreign_key: true

      t.string :firstName
      t.string :lastName
      t.string :email
      t.string :foodType
      t.string :companyName

      t.timestamps
    end
  end
end
