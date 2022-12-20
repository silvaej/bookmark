import * as jwt from 'njwt'

const token = jwt.create({ user: 'EJ' }, 'supersecret')
export default token
