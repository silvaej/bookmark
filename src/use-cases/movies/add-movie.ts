import { AddMovieUseCaseIf } from '@src/interfaces/use-cases/movies'
import { MovieBase } from '@src/models/Movie'
import { MovieRepository } from '@src/repositories/movie-repository'

export class AddMovie implements AddMovieUseCaseIf {
    constructor(private repository: MovieRepository) {}

    async execute(movie: MovieBase): Promise<void> {
        const result = await this.repository.addMovie(movie)
        if (!result.acknowledged) throw new Error(result.error!)
    }
}
