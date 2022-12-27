import { UserRepositoryIf } from '@src/interfaces/repositories/user-repository'
import { LoginUseCaseIf } from '@src/interfaces/use-cases/auth'
import { UserResponse } from '@src/models/User'
import { verify } from '@utils/hash'

export class Login implements LoginUseCaseIf {
    constructor(private repository: UserRepositoryIf) {}

    async execute(email: string, password: string): Promise<UserResponse> {
        const { acknowledged, data, error } = await this.repository.findUser(email)
        if (!acknowledged) throw new Error(error!) // The error here is internal thus 500
        const user = data && data[0]
        if (!user) throw new Error('NotFound') // This error is 404 not found
        const authorized = await verify(password, user.password)
        if (!authorized) throw new Error('Unauthorized') // This error is 401 Unauthorized
        return user
    }
}
