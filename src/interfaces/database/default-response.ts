import { MovieResponse } from '@src/models/Movie'

export interface DefaultResponse<T extends MovieResponse | Array<MovieResponse>> {
    acknowledged: boolean
    data: T | null
    error: string | null
}
