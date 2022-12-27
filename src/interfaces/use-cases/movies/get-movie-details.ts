import { DefaultResponse } from '@src/interfaces/database/default-response'
import { MovieResponse } from '@src/models/Movie'

export interface GetMovieDetailsUseCaseIf {
    execute(id: string, uid: string): Promise<MovieResponse>
}
