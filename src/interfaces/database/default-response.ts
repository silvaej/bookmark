import { MovieResponse } from '@src/models/Movie'
import { UserResponse } from '@src/models/User'

export interface DefaultResponse<T extends MovieResponse | Array<MovieResponse> | UserResponse | Array<UserResponse>> {
    acknowledged: boolean
    data: T | null
    error: string | null
}
