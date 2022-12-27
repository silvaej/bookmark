import { MovieBase, MovieResponse } from '@src/models/Movie'
import { DefaultResponse } from '../database/default-response'

export interface MovieRepositoryIf {
    addMovie(movie: MovieBase): Promise<DefaultResponse<MovieResponse>>
    retrieveMovies(filter: object, search?: string): Promise<DefaultResponse<Array<MovieResponse>>>
    updateMovie(updatedInfo: MovieResponse): Promise<DefaultResponse<MovieResponse>>
    deleteMovie(id: string, uid: string): Promise<DefaultResponse<MovieResponse>>
    deleteAllMovies(uid: string): Promise<DefaultResponse<MovieResponse>>
}
