import server from './server'
import { Logger } from './utils/logger'

Logger.setLogger()
server.use(Logger.httpLogger())

/** ESTABLISHING HTTP CONNECTION */
server.get('/', (req, res) => res.send('Thank you for using this boilerplate for Clean Architecture TS Project.'))
server.listen(8080, () => Logger.log('info', 'Server running at localhost:8080'))
