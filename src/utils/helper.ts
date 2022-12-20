import { ObjectId } from 'mongodb'

export function transformObjectId(id: string) {
    return new ObjectId(id)
}
