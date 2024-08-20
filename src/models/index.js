const Movie = require("./Movie")

const Genre = require("./Genre")
const Director = require("./Director")
const Actor = require("./Actor")

Genre.belongsToMany(Movie, { through: 'genresMovies' })
Movie.belongsToMany(Genre, { through: 'genresMovies' })

Director.belongsToMany(Movie, { through: 'directorsMovies' })
Movie.belongsToMany(Director, { through: 'directorsMovies' })

Actor.belongsToMany(Movie, { through: 'actorsMovies'})
Movie.belongsToMany(Actor, { through: 'actorsMovies'})










