# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

# Create a admin user
admin_user = User.create(
  email: 'admin@gmail.com',
  password: 'popeyelemarinosoy123',
  role: :admin
)

saller_user = User.create(
  email: 'saller@gmail.com',
  password: 'popeyelemarinosoy123',
  role: :saller
)

puts 'Admin user created'
puts 'Saller user created'
