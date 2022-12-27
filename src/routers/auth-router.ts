import { LoginUseCaseIf, SignUpUseCaseIf } from '@src/interfaces/use-cases/auth'
import { Logger } from '@src/utils/logger'
import { Router, Request, Response } from 'express'
import * as jwt from 'njwt'

export function createAuthRouter(login: LoginUseCaseIf, register: SignUpUseCaseIf): Router {
    const router = Router()

    /** REGISTER USER */
    router.post('/', async (req: Request, res: Response) => {
        try {
            const userRequest = req.body
            await register.execute(userRequest)
            Logger.log('info', 'Succesfully added the user to the database.')
            res.status(201).json({ ok: true })
        } catch (err) {
            if (err instanceof Error) {
                if (err.message != 'Conflict') {
                    Logger.log('error', err.message)
                    res.status(500).json({ ok: false, reason: err.message })
                } else {
                    Logger.log('info', err.message)
                    res.status(409).json({ ok: false, reason: err.message })
                }
            }
        }
    })

    /** LOGIN USER */
    router.get('/', async (req: Request, res: Response) => {
        try {
            const { email, password } = req.query
            if (email && typeof email === 'string' && password && typeof password === 'string') {
                const result = await login.execute(email, password)
                Logger.log('info', `User ${result.username} with id ${result.id} is logged in successfuly.`)

                const token = jwt
                    .create({ ...result }, process.env.ACCESS_TOKEN_SECRET)
                    .setExpiration(new Date().getTime() + 60 * 60 * 1000 * 168)
                    .compact()
                res.status(200).json({ ok: true, token })
                return
            }
            Logger.log('info', 'Missing query parameter/s')
            res.status(400).json({ ok: false, error: 'Missing query parameter/s' })
        } catch (err) {
            if (err instanceof Error) {
                if (!['NotFound', 'Unauthorized'].includes(err.message)) {
                    Logger.log('error', err.message)
                    res.status(500).json({ ok: false, reason: err.message })
                } else {
                    Logger.log('info', err.message)
                    res.status(err.message === 'NotFound' ? 404 : 401).json({ ok: false, reason: err.message })
                }
            }
        }
    })

    /** PREVENT OTHER REQUEST TYPE */
    router.all('/', (res: Response) => {
        Logger.log('error', 'Request method not allowed/implemented.')
        res.status(501).json({ ok: false, reason: 'Not implemented' })
    })

    return router
}
