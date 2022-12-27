import { MovieRepositoryIf } from '@src/interfaces/repositories/movie-repository'
import { UpdateMovieUseCaseIf } from '@src/interfaces/use-cases/movies'
import { MovieResponse } from '@src/models/Movie'

export class UpdateMovie implements UpdateMovieUseCaseIf {
    constructor(private repository: MovieRepositoryIf) {}

    async execute(movie: MovieResponse): Promise<void> {
        const result = await this.repository.updateMovie(movie)
        if (!result.acknowledged) throw new Error(result.error!) // 500
    }
}
