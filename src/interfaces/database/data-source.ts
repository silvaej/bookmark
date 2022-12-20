import { MovieBase, MovieResponse } from '@src/models/Movie'
import { UserBase, UserResponse } from '@src/models/User'
import { DefaultResponse } from './default-response'

export interface DataSource {
    /** Find element with or without filter */
    find(query: object, search?: string): Promise<DefaultResponse<any>>
    /** Insert a document of instance T to the database */
    insertOne<T extends MovieBase | UserBase, U extends MovieResponse | UserResponse>(
        doc: T
    ): Promise<DefaultResponse<U>>
    /** Find one existing record by id then update the record if exists */
    findOneByIdAndUpdate<T extends MovieBase | UserBase, U extends MovieResponse | UserResponse>(
        id: string,
        update: T
    ): Promise<DefaultResponse<U>>
    /** Find one existing record by id then delete the record if exists */
    findOneByIdAndDelete<T extends MovieResponse | UserResponse>(id: string, uid: string): Promise<DefaultResponse<T>>
}
