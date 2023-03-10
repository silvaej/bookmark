import { Request, Response, Router } from 'express'
import { Logger } from '@src/utils/logger'
import { GetMoviesListValidator, MovieValidator } from '@src/utils/validate'
import {
    AddMovieUseCaseIf,
    DeleteMovieUseCaseIf,
    RetrieveMoviesUseCaseIf,
    UpdateMovieUseCaseIf,
} from '@src/interfaces/use-cases/movies'
import { authorize } from '@src/middlewares/authorize'
import { ValidationError } from '@src/utils/error'
import { GetMovieDetailsUseCaseIf } from '@src/interfaces/use-cases/movies/get-movie-details'
import { DeleteAllMovieUseCaseIf } from '@src/interfaces/use-cases/movies/delete-all'
Logger.setLogger()

export function createMovieRouter(
    add: AddMovieUseCaseIf,
    retrieve: RetrieveMoviesUseCaseIf,
    update: UpdateMovieUseCaseIf,
    remove: DeleteMovieUseCaseIf,
    get: GetMovieDetailsUseCaseIf,
    deleteAll: DeleteAllMovieUseCaseIf
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
                if (err instanceof ValidationError) {
                    Logger.log('info', err.message)
                    res.status(400).json({ ok: false, error: err.message })
                    return
                }

                Logger.log('error', err.message)
                res.status(500).json({ ok: false, error: err.message })
            }
        }
    })

    /** RETRIEVE MOVIES ROUTE */
    router.get('/', authorize, async (req: Request, res: Response) => {
        try {
            const id = res.locals.uid

            const { page, limit, search, ...filter } = req.query
            const parsedLimit = limit ? Number(limit) : undefined
            const parsedPage = page ? Number(page) : undefined
            GetMoviesListValidator.validatePagination(parsedPage, parsedLimit)
            const data = await retrieve.execute(
                { ...filter, id },
                search && typeof search === 'string' ? search : '',
                parsedLimit,
                parsedPage
            )
            Logger.log('info', 'Movie information retrieved')
            res.status(200).json({ ok: true, ...data })
        } catch (err) {
            if (err instanceof Error) {
                if (err instanceof ValidationError) {
                    Logger.log('info', err.message)
                    res.status(400).json({ ok: false, error: err.message })
                    return
                }
                if (err.message === 'NotFound') {
                    Logger.log('info', err.message)
                    res.status(404).json({ ok: false, error: 'Resources not found' })
                    return
                }
                Logger.log('error', err.message)
                res.status(500).json({ ok: false, error: err.message })
            }
        }
    })

    /** GET SPECIFIC MOVIE USING THEIR ID */
    router.get('/:id', authorize, async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const { uid } = res.locals

            const response = await get.execute(id, uid)
            Logger.log('info', 'Movie information retrieved')
            res.status(200).json({ ok: true, data: response })
        } catch (err) {
            if (err instanceof Error) {
                if (err.message === 'NotFound') {
                    Logger.log('info', err.message)
                    res.status(404).json({ ok: false, error: 'Resources not found' })
                    return
                }

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
            res.status(204).end()
        } catch (err) {
            if (err instanceof Error) {
                if (err instanceof ValidationError) {
                    Logger.log('info', err.message)
                    res.status(400).json({ ok: false, error: err.message })
                    return
                }

                if (err.message === 'NotFound') {
                    Logger.log('info', err.message)
                    res.status(404).json({ ok: false, error: 'Resources not found' })
                    return
                }

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
            res.status(204).end()
        } catch (err) {
            if (err instanceof Error) {
                if (err.message === 'NotFound') {
                    Logger.log('info', err.message)
                    res.status(404).json({ ok: false, error: 'Resources not found' })
                    return
                }

                Logger.log('error', err.message)
                res.status(500).json({ ok: false, error: err.message })
            }
        }
    })

    /** DELETE ALL MOVIE ENTRIES OF THE USER */
    router.delete('/', authorize, async (req: Request, res: Response) => {
        try {
            const { uid } = res.locals
            await deleteAll.execute(uid)
            Logger.log('info', `All movies from the user ${uid} deleted`)
            res.status(204).end()
        } catch (err) {
            if (err instanceof Error) {
                if (err.message === 'NotFound') {
                    Logger.log('info', err.message)
                    res.status(404).json({ ok: false, error: 'Resources not found' })
                    return
                }
                Logger.log('error', err.message)
                res.status(500).json({ ok: false, error: err.message })
            }
        }
    })

    /** PREVENT OTHER REQUEST TYPE */
    router.all('/', (req: Request, res: Response) => {
        Logger.log('warn', 'Request method not allowed/implemented.')
        res.status(501).json({ ok: false, reason: 'Not implemented' })
    })

    return router
}
