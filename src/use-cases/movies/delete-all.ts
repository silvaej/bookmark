import { MovieRepositoryIf } from '@src/interfaces/repositories/movie-repository'
import { DeleteAllMovieUseCaseIf } from '@src/interfaces/use-cases/movies/delete-all'

export class DeleteAllMovies implements DeleteAllMovieUseCaseIf {
    constructor(private repository: MovieRepositoryIf) {}

    async execute(uid: string): Promise<void> {
        const result = await this.repository.deleteAllMovies(uid)
        if (!result.acknowledged) throw new Error(result.error!) // 500
    }
}
