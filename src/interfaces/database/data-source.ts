import { MovieBase, MovieResponse } from '@src/models/Movie'
import { DefaultResponse } from './default-response'

export interface DataSource {
    /** Find element with or without filter */
    find<T extends MovieResponse>(query: object, search?: string): Promise<DefaultResponse<Array<T>>>
    /** Insert a document of instance T to the database */
    insertOne<T extends MovieBase, U extends MovieResponse>(doc: T): Promise<DefaultResponse<U>>
    /** Find one existing record by id then update the record if exists */
    findOneByIdAndUpdate<T extends MovieBase, U extends MovieResponse>(
        id: string,
        update: T
    ): Promise<DefaultResponse<U>>
    /** Find one existing record by id then delete the record if exists */
    findOneByIdAndDelete<T extends MovieResponse>(id: string): Promise<DefaultResponse<T>>
}
