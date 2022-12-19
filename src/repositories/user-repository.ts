import { DataSource } from '@src/interfaces/database/data-source'
import { DefaultResponse } from '@src/interfaces/database/default-response'
import { UserRepositoryIf } from '@src/interfaces/repositories/user-repository'
import { UserBase, UserResponse } from '@src/models/User'

export class UserRepository implements UserRepositoryIf {
    constructor(private source: DataSource) {}

    async registerUser(user: UserBase): Promise<DefaultResponse<UserResponse>> {
        return this.source.insertOne(user)
    }

    async findUser(email: string): Promise<DefaultResponse<Array<UserResponse>>> {
        return this.source.find({ email })
    }

    async findUserById(id: string): Promise<DefaultResponse<Array<UserResponse>>> {
        return this.source.find({ id })
    }
}
