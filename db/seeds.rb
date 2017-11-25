# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# demo user

User.create(username: 'eHemmingway', password: 'fivetoedcat')

# child-icon user

User.create(username: 'rFrost', password: 'password')

# leaf-icon user

User.create(username: 'jConrad', password: 'password', points: 900)

# fire icon user

User.create(username: 'gGMarquez', password: 'password', points: 1200)

# lightning bolt user

User.create(username: 'ebWhite', password: 'password', points: 2000)
