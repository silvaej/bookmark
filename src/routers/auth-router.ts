import { LoginUseCaseIf, SignUpUseCaseIf } from '@src/interfaces/use-cases/auth'
import { Logger } from '@src/utils/logger'
import { Router, Request, Response } from 'express'

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
                Logger.log('error', err.message)
                res.status(500).json({ ok: false, error: err.message })
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
                res.status(200).json(result)
                return
            }
            Logger.log('warn', 'Missing query parameter/s')
            res.status(400).json({ error: 'Missing query parameter/s' })
        } catch (err) {
            if (err instanceof Error) {
                Logger.log('error', err.message)
                if (err.message == 'Wrong Password') res.status(401).json({ reason: "Passwords doesn't match." })
                else res.status(500).json({ reason: err.message })
            }
        }
    })

    /** PREVENT OTHER REQUEST TYPE */
    router.all('/', (res: Response) => {
        Logger.log('warn', 'Request method not allowed/implemented.')
        res.status(501).end()
    })

    return router
}
