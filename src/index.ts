import server from './server'
import { Logger } from './utils/logger'
import { getDbConnection, MongoDB } from '@data/connections/mongodb-connection'
import { MongoDbDataSource } from './data/sources/mongodb-data-source'
import { MovieRepository } from './repositories/movie-repository'
import { createMovieRouter } from './routers/movie-router'
import { AddMovie, DeleteMovie, RetrieveMovies, UpdateMovie } from './use-cases/movies'

Logger.setLogger()
server.use(Logger.httpLogger())

/** ESTABLISHING HTTP CONNECTION */
;(async () => {
    const db = await getDbConnection()

    // Configuring movie route
    const movieSource = new MongoDbDataSource(new MongoDB(db, 'MOVIES'))
    const movieRepo = new MovieRepository(movieSource)
    const movieRoute = createMovieRouter(
        new AddMovie(movieRepo),
        new RetrieveMovies(movieRepo),
        new UpdateMovie(movieRepo),
        new DeleteMovie(movieRepo)
    )
    server.use('/movies', movieRoute)

    // For common connection
    server.get('/', (req, res) => res.send('Thank you for using this boilerplate for Clean Architecture TS Project.'))
    server.listen(8080, () => Logger.log('info', 'Server running at localhost:8080'))
})()
