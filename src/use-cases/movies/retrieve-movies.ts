import { MovieRepositoryIf } from '@src/interfaces/repositories/movie-repository'
import { RetrieveMoviesUseCaseIf } from '@src/interfaces/use-cases/movies'
import { MovieResponse } from '@src/models/Movie'

export class RetrieveMovies implements RetrieveMoviesUseCaseIf {
    constructor(private repository: MovieRepositoryIf) {}

    async execute(filters: object, search: string): Promise<Array<MovieResponse>> {
        const result = await this.repository.retrieveMovies(filters, search)
        if (!result.acknowledged) throw new Error(result.error!)
        return result.data!
    }
}
