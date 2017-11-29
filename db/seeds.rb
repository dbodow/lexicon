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

List.create_list( User.find_by(username: 'eHemmingway'),
                  ['bumfuzzle', 'defenestrate', 'flocculent', 'frogman', 'logophile'],
                   List.new(
                          title: "Fun words to enjoy the beauty of English!",
                          description: "This is a list of some of our favorite words. Will they come up in everyday usage? No. Will they be fun to use? Definitely.",
                          active: true
                          )
                )

List.create_list( User.find_by(username: 'eHemmingway'),
                  ['aria', 'fugue', 'leitmotif', 'octave', 'timbre'],
                   List.new(
                          title: "Music and Sound: a technical vocabulary for artistic practice.",
                          description: "Music's not your forte? No problem. Vocabulary isn't just about academics. Every field has its own lexicon, and music is no different. This list covers technical words from music to expany your knowledge of the language of sound.",
                          active: true
                          )
                )
