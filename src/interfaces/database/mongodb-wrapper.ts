/** Simple CRUD Operation for MongoDB implementation */
import { MovieResponse } from '@src/models/Movie'
import { UserResponse } from '@src/models/User'
import { DeleteResult, InsertOneResult, UpdateResult } from 'mongodb'

export interface MongoDbWrapper {
    find(query: object): Promise<Array<any>>
    insertOne(doc: any): Promise<InsertOneResult>
    deleteOne(id: string, uid: string): Promise<DeleteResult>
    updateOne(id: string, data: object): Promise<UpdateResult>
}
