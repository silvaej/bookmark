import { MovieResponse } from '@src/models/Movie'
import { UserResponse } from '@src/models/User'
import { ObjectId } from 'mongodb'

export interface QueryFields extends Partial<MovieResponse & UserResponse> {}
