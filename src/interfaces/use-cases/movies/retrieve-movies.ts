import { Movies } from '@src/models/Movie'

export interface RetrieveMoviesUseCaseIf {
    execute(filters: object, search: string, limit?: number, page?: number): Promise<Movies>
}
