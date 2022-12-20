import { Db, DeleteResult, Document, InsertOneResult, MongoClient, ObjectId, UpdateResult } from 'mongodb'
import { MongoDbWrapper } from '@src/interfaces/database/mongodb-wrapper'
import { Logger } from '@src/utils/logger'
Logger.setLogger()

export class MongoDB implements MongoDbWrapper {
    constructor(private db: Db, private collection: string) {
        db.createIndex(collection, { '$**': 'text' })
    }

    async find(query: object): Promise<Array<any>> {
        const results = await this.db.collection(this.collection).find(query).toArray()
        return results.map(item => {
            const { _id, ...rest } = item
            return { id: _id.toString(), ...rest }
        })
    }

    async insertOne(doc: any): Promise<InsertOneResult<Document>> {
        return await this.db.collection(this.collection).insertOne(doc)
    }

    async deleteOne(id: string, uid: string): Promise<DeleteResult> {
        return await this.db.collection(this.collection).deleteOne({ _id: new ObjectId(id), uid })
    }

    async updateOne(id: string, data: object): Promise<UpdateResult> {
        return await this.db.collection(this.collection).updateOne({ _id: new ObjectId(id) }, data)
    }
}

export async function getDbConnection(): Promise<Db> {
    const client: MongoClient = new MongoClient(
        `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_SECRET}@dbookmarkv1.54cfegg.mongodb.net/?retryWrites=true&w=majority`
    )
    Logger.log('info', 'Connecting to the MongoDB Client. Please wait...')
    await client.connect()
    Logger.log('info', 'Connected to MongoDB Client.')
    const db = client.db(process.env.NODE_ENV)
    return db
}
