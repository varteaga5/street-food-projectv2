class CreateMenus < ActiveRecord::Migration[6.1]
  def change
    create_table :menus do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.string :companyName
      t.string :foodName
      t.string :foodDesc
      t.string :price

      t.timestamps
    end
  end
end
