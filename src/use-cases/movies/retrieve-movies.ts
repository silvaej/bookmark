import { MovieRepositoryIf } from '@src/interfaces/repositories/movie-repository'
import { RetrieveMoviesUseCaseIf } from '@src/interfaces/use-cases/movies'
import { Movies } from '@src/models/Movie'

export class RetrieveMovies implements RetrieveMoviesUseCaseIf {
    constructor(private repository: MovieRepositoryIf) {}

    async execute(filters: object, search: string, limit?: number, page?: number): Promise<Movies> {
        const result = await this.repository.retrieveMovies(filters, search)
        if (!result.acknowledged) throw new Error(result.error!)

        let response: Movies = {
            data: result.data!,
            totalResults: result.data!.length,
            totalPages: 1,
            page: 1,
        }

        if (limit !== undefined && page !== undefined) {
            const data = response.data.slice((page - 1) * limit, page * limit)
            if (!data.length) throw new Error('NotFound')
            response = {
                ...response,
                totalPages: Math.ceil(response.totalResults / limit),
                data,
                page,
            }
        }

        return response
    }
}
