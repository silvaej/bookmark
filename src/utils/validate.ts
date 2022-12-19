/** Check if the body arguments for the movie post request contains all the required parameters  */

import { MovieBase, MovieResponse } from '@src/models/Movie'

export class MovieValidator {
    public static validateRequest(movie: MovieBase) {
        this.validateProps(movie)
    }

    public static validateResponse(movie: MovieResponse) {
        this.validateProps(movie)
        if (!movie.id || typeof movie.id === 'string') throw new Error('Id parameter missing')
    }

    private static validateProps(movie: MovieBase) {
        if (!movie.title || typeof movie.title !== 'string') throw new Error('Title parameter missing')
        if (!movie.website || typeof movie.website !== 'string') throw new Error('Website parameter missing')
        if (!movie.url || typeof movie.url !== 'string') throw new Error('Url parameter missng')
        if (movie.custom_tags && !(movie.custom_tags instanceof Array))
            throw new Error('Custom tags variable must be an aray')
    }
}
