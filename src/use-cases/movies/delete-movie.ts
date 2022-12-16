import { MovieRepositoryIf } from '@src/interfaces/repositories/movie-repository'
import { DeleteMovieUseCaseIf } from '@src/interfaces/use-cases/movies'

export class DeleteMovies implements DeleteMovieUseCaseIf {
    constructor(private repository: MovieRepositoryIf) {}

    async execute(id: string): Promise<void> {
        const result = await this.repository.deleteMovie(id)
        if (!result.acknowledged) throw new Error(result.error!)
    }
}
