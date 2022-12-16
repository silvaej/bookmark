import { MovieResponse } from '@src/models/Movie'

export interface RetrieveMoviesUseCaseIf {
    execute(filters: object, search: string): Promise<Array<MovieResponse>>
}
