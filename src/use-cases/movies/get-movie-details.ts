import { MovieRepositoryIf } from '@src/interfaces/repositories/movie-repository'
import { GetMovieDetailsUseCaseIf } from '@src/interfaces/use-cases/movies/get-movie-details'
import { MovieResponse } from '@src/models/Movie'

export class GetMovieDetails implements GetMovieDetailsUseCaseIf {
    constructor(private repository: MovieRepositoryIf) {}

    async execute(id: string, uid: string): Promise<MovieResponse> {
        const result = await this.repository.retrieveMovies({ id, uid })
        if (!result.acknowledged) throw new Error(result.error!)
        return result.data![0]
    }
}
