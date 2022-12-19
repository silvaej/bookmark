import { UserRepositoryIf } from '@src/interfaces/repositories/user-repository'
import { FindUserByIdUseCaseIf } from '@src/interfaces/use-cases/users'
import { UserResponse } from '@src/models/User'

export class FindUserById implements FindUserByIdUseCaseIf {
    constructor(private repository: UserRepositoryIf) {}

    async execute(id: string): Promise<UserResponse> {
        const { acknowledged, data, error } = await this.repository.findUserById(id)
        if (!acknowledged) throw new Error(error!)
        const user = data && data[0]
        if (!user) throw new Error('User does not exists.')
        return user
    }
}
