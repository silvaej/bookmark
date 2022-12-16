import { MovieBase } from '@src/models/Movie'

export interface AddMovieUseCaseIf {
    execute(movie: MovieBase): Promise<void>
}
