import { MovieRepositoryIf } from '@src/interfaces/repositories/movie-repository'
import { DeleteMovieUseCaseIf } from '@src/interfaces/use-cases/movies'

export class DeleteMovie implements DeleteMovieUseCaseIf {
    constructor(private repository: MovieRepositoryIf) {}

    async execute(id: string, uid: string): Promise<void> {
        const result = await this.repository.deleteMovie(id, uid)
        if (!result.acknowledged) throw new Error(result.error!)
    }
}
