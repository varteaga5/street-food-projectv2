require 'faker'
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# Customer.create(name:"rick", username:"rickuser209", favFood: "tacos")


puts "starting seed"

100.times do
   vend = Vendor.create!(firstName: Faker::Name.first_name, lastName: Faker::Name.last_name, email: Faker::Internet.unique.email, password: '123', foodType: Faker::Restaurant.type, companyName: Faker::Restaurant.unique.name )

   vend.menus.create!(companyName: vend.companyName, foodName: Faker::Food.dish, foodDesc: Faker::Food.description, price: Faker::Number.between(from: 1, to: 10))
end
# menus
# t.bigint "user_id", null: false
# t.string "companyName"
# t.string "foodName"
# t.string "foodDesc"
# t.string "price"

# vendors
# Vendor.create!(firstName: 'timmyVendor', lastName: 'timmyVendor', email: 'timmyVendor@timmyVendor.com', password: '123', foodType: 'tacos', companyName:'timmytaco')
# Vendor.create!(firstName: 'tobyVendor', lastName: 'tobyVendor', email: 'tobyVendor@tobyVendor.com', password: '123', foodType: 'tacos', companyName:'tobytaco')
# Vendor.create!(firstName: 'tomVendor', lastName: 'tomVendor', email: 'tomVendor@tomVendor.com', password: '123', foodType: 'tacos', companyName:'tomtaco')

# # Customers
# Customer.create!(firstName: 'peteCust', lastName: 'peteCust', email: 'peteCust@peteCust.com', password: '123', favFood:'tacos')
# Customer.create!(firstName: 'paulCust', lastName: 'paulCust', email: 'paulCust@paulCust.com', password: '123', favFood:'tacos')
# Customer.create!(firstName: 'patCust', lastName: 'patCust', email: 'patCust@patCust.com', password: '123', favFood: 'burro')

# fav_vendors

# FavVendor.create!(firstName: 'treVendor', lastName: 'treVendor', email: 'treVendor@treVendor.com', foodType: 'tacos', companyName:'tretacos', user_id:69)
# FavVendor.create!(firstName: 'dreVendor', lastName: 'dreVendor', email: 'dreVendor@dreVendor.com', foodType: 'tacos', companyName:'dretacos', user_id: 70)

puts "seed complete"
