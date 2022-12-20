import { DataSource } from '@src/interfaces/database/data-source'
import { DefaultResponse } from '@src/interfaces/database/default-response'
import { MongoDbWrapper } from '@src/interfaces/database/mongodb-wrapper'
import { QueryFields } from '@src/interfaces/database/query-fields'
import { MovieBase, MovieResponse } from '@src/models/Movie'
import { UserBase, UserResponse } from '@src/models/User'
import { transformObjectId } from '@src/utils/helper'

export class MongoDbDataSource implements DataSource {
    constructor(private db: MongoDbWrapper) {}

    async find(query: QueryFields, search?: string): Promise<DefaultResponse<any>> {
        const { id, uid, ...otherQueries } = query
        if (id && !uid) {
            query = { uid: id, ...otherQueries }
        }
        const queryString = search ? { ...query, $text: { $search: search } } : query
        const results = await this.db.find(queryString)

        if (results.length)
            return {
                acknowledged: true,
                data: results,
                error: null,
            }
        return {
            acknowledged: false,
            data: null,
            error: 'No result',
        }
    }

    async insertOne<T extends MovieBase | UserBase, U extends MovieResponse | UserResponse>(
        doc: T
    ): Promise<DefaultResponse<U>> {
        const { acknowledged } = await this.db.insertOne(doc)
        return {
            acknowledged,
            data: null,
            error: acknowledged ? null : 'Something went wrong',
        }
    }

    async findOneByIdAndUpdate<T extends MovieBase | UserBase, U extends MovieResponse | UserResponse>(
        id: string,
        update: T
    ): Promise<DefaultResponse<U>> {
        const { acknowledged, matchedCount } = await this.db.updateOne(id, { $set: update })

        let response: DefaultResponse<U> = {
            acknowledged: false,
            data: null,
            error: null,
        }
        if (!acknowledged) {
            response.error = 'Something went wrong'
            return response
        }
        if (matchedCount === 0) {
            response.error = 'Not found'
            return response
        }

        response.acknowledged = true
        return response
    }

    async findOneByIdAndDelete<T extends MovieResponse | UserResponse>(
        id: string,
        uid: string
    ): Promise<DefaultResponse<T>> {
        const { acknowledged, deletedCount } = await this.db.deleteOne(id, uid)
        return {
            acknowledged: acknowledged && !!deletedCount,
            data: null,
            error: acknowledged && !!deletedCount ? null : 'Not found',
        }
    }
}
