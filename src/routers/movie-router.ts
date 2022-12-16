import express, { Request, Response, Router } from 'express'
import { Logger } from '@src/utils/logger'
import {
    AddMovieUseCaseIf,
    DeleteMovieUseCaseIf,
    RetrieveMoviesUseCaseIf,
    UpdateMovieUseCaseIf,
} from '@src/interfaces/use-cases/movies'
Logger.setLogger()

export function createMovieRouter(
    add: AddMovieUseCaseIf,
    retrieve: RetrieveMoviesUseCaseIf,
    update: UpdateMovieUseCaseIf,
    remove: DeleteMovieUseCaseIf
): express.Router {
    const router = express.Router()

    /** ADD MOVIE ROUTE */
    router.post('/', async (req: Request, res: Response) => {
        try {
            // request body is needed to be validate (validate if all required fields are present) before executing the function
            await add.execute(req.body)
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
    router.get('/', async (req: Request, res: Response) => {
        // For this all filters must be validated first ... same as the  search query
        try {
            const { filter, search } = req.query
            if (filter && search && typeof search === 'string') {
                const result = await retrieve.execute({ filter }, search)
                Logger.log('info', 'Movie information retrieved')
                res.status(200).json({ ok: true, data: result })
            }
        } catch (err) {
            if (err instanceof Error) {
                Logger.log('error', err.message)
                res.status(500).json({ ok: false, error: err.message })
            }
        }
    })

    /** UPDATE MOVIE ROUTE */
    router.put('/', async (req: Request, res: Response) => {
        try {
            // The updated movie info needs to be validated as well
            const updatedMovieInfo = req.body
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
    router.delete('/:id', async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            await remove.execute(id)
            Logger.log('info', `Movie with an id of ${id} has been deleted`)
            res.status(200).json({ message: `Movie with an id of ${id} has been deleted` })
        } catch (err) {
            if (err instanceof Error) {
                Logger.log('error', err.message)
                res.status(500).json({ ok: false, error: err.message })
            }
        }
    })

    /** PREVENT OTHER ROUTE */
    router.all('/', (res: Response) => {
        Logger.log('warn', 'Request method not allowed/implemented.')
        res.status(501).end()
    })

    return router
}