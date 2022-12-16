import { MovieResponse } from '@src/models/Movie'

export interface UpdateMovieUseCaseIf {
    execute(movie: MovieResponse): Promise<void>
}
