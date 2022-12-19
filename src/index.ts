import server from './server'
import { Logger } from './utils/logger'
import { getDbConnection, MongoDB } from '@data/connections/mongodb-connection'
import { MongoDbDataSource } from './data/sources/mongodb-data-source'
import { MovieRepository } from './repositories/movie-repository'
import { createMovieRouter } from './routers/movie-router'
import { AddMovie, DeleteMovie, RetrieveMovies, UpdateMovie } from './use-cases/movies'
import { UserRepository } from './repositories/user-repository'
import { createAuthRouter } from './routers/auth-router'
import { Login } from './use-cases/auth/login'
import { Signup } from './use-cases/auth/signup'

Logger.setLogger()
server.use(Logger.httpLogger())

/** ESTABLISHING HTTP CONNECTION */
;(async () => {
    const db = await getDbConnection()

    // Configuring auth route
    const authSource = new MongoDbDataSource(new MongoDB(db, 'USERS'))
    const authRepo = new UserRepository(authSource)
    const authRoute = createAuthRouter(new Login(authRepo), new Signup(authRepo))
    server.use('/auth', authRoute)

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
    server.get('/', (req, res) => res.status(200).json({ ok: true }))
    server.listen(8080, () => Logger.log('info', 'Server running at localhost:8080'))
})()
