/** Check if the body arguments for the movie post request contains all the required parameters  */

import { MovieBase, MovieResponse } from '@src/models/Movie'
import { ValidationError } from './error'

export class MovieValidator {
    public static validateRequest(movie: MovieBase) {
        this.validateProps(movie)
    }

    public static validateResponse(movie: MovieResponse) {
        this.validateProps(movie)
        if (!movie.id || typeof movie.id !== 'string') throw new ValidationError('Id parameter missing')
    }

    private static validateProps(movie: MovieBase) {
        if (!movie.title || typeof movie.title !== 'string') throw new ValidationError('Title parameter missing')
        if (!movie.website || typeof movie.website !== 'string') throw new ValidationError('Website parameter missing')
        if (!movie.description || typeof movie.description !== 'string')
            throw new ValidationError('Description parameter missing')
        if (!movie.url || typeof movie.url !== 'string') throw new ValidationError('Url parameter missng')
        if (movie.custom_tags && !(movie.custom_tags instanceof Array))
            throw new ValidationError('Custom tags variable must be an aray')
    }
}

export class GetMoviesListValidator {
    public static validatePagination(page?: number, limit?: number) {
        const pageExists = page !== undefined
        const limitExists = limit !== undefined

        if ((pageExists && !limitExists) || (!pageExists && limitExists))
            throw new ValidationError('Page and limit must exist or not exist at the same time')

        if (pageExists && limitExists) {
            if (isNaN(page) || isNaN(limit)) throw new ValidationError('Page and Limit must be a number')

            if (page <= 0 || limit <= 0) throw new ValidationError('Page and limit must be greater than 0')
        }
    }
}
