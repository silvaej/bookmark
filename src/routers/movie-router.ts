import { Request, Response, Router } from 'express'
import { Logger } from '@src/utils/logger'
import { MovieValidator } from '@src/utils/validate'
import {
    AddMovieUseCaseIf,
    DeleteMovieUseCaseIf,
    RetrieveMoviesUseCaseIf,
    UpdateMovieUseCaseIf,
} from '@src/interfaces/use-cases/movies'
import * as jwt from 'njwt'
import { authorize } from '@src/middlewares/authorize'
Logger.setLogger()

export function createMovieRouter(
    add: AddMovieUseCaseIf,
    retrieve: RetrieveMoviesUseCaseIf,
    update: UpdateMovieUseCaseIf,
    remove: DeleteMovieUseCaseIf
): Router {
    const router = Router()

    /** ADD MOVIE ROUTE */
    router.post('/', authorize, async (req: Request, res: Response) => {
        try {
            const movieRequest = { ...req.body, uid: res.locals.uid }
            MovieValidator.validateRequest(movieRequest)
            await add.execute(movieRequest)
            Logger.log('info', 'Succesfully added movie to the database.')
            res.status(201).json({ ok: true })
        } catch (err) {
            if (err instanceof Error) {
                Logger.log('error', err.message)
                res.status(500).json({ ok: false, error: err.message })
            }
        }
    })

    /** RETRIEVE MOVIES ROUTE */
    router.get('/', authorize, async (req: Request, res: Response) => {
        try {
            const id = res.locals.uid

            const { search, ...filter } = req.query
            const result = await retrieve.execute({ ...filter, id }, search && typeof search === 'string' ? search : '')
            Logger.log('info', 'Movie information retrieved')
            res.status(200).json({ ok: true, data: result })
        } catch (err) {
            if (err instanceof Error) {
                Logger.log('error', err.message)
                res.status(500).json({ ok: false, error: err.message })
            }
        }
    })

    /** UPDATE MOVIE ROUTE */
    router.put('/', authorize, async (req: Request, res: Response) => {
        try {
            // The updated movie info needs to be validated as well
            const updatedMovieInfo = { ...req.body, uid: res.locals.uid }
            MovieValidator.validateResponse(updatedMovieInfo)
            await update.execute(updatedMovieInfo)
            Logger.log('info', `Movie with an id of ${updatedMovieInfo.id} has been updated`)
            res.status(200).json({ message: `Movie with an id of ${updatedMovieInfo.id} has been updated` })
        } catch (err) {
            if (err instanceof Error) {
                Logger.log('error', err.message)
                res.status(500).json({ ok: false, error: err.message })
            }
        }
    })

    /** DELETE MOVIE ROUTE */
    router.delete('/:id', authorize, async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            await remove.execute(id, res.locals.uid)
            Logger.log('info', `Movie with an id of ${id} has been deleted`)
            res.status(200).json({ message: `Movie with an id of ${id} has been deleted` })
        } catch (err) {
            if (err instanceof Error) {
                Logger.log('error', err.message)
                res.status(500).json({ ok: false, error: err.message })
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
