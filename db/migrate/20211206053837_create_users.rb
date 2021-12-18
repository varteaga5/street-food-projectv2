class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :type
      t.string :firstName
      t.string :lastName
      t.string :email
      t.string :password_digest
      t.string :foodType
      t.string :companyName
      t.string :favFood

      t.timestamps
    end
    add_index :users, [:type]
  end
end
