import { UserRepositoryIf } from '@src/interfaces/repositories/user-repository'
import { SignUpUseCaseIf } from '@src/interfaces/use-cases/auth'
import { UserBase, UserResponse } from '@src/models/User'
import { encrypt } from '@src/utils/hash'

export class Signup implements SignUpUseCaseIf {
    constructor(private repository: UserRepositoryIf) {}

    async execute(user: UserBase): Promise<void> {
        const alreadyExists = (await this.repository.findUser(user.email)).acknowledged
        if (alreadyExists) throw new Error('Conflict') // 409?

        const { password, ...rest } = user
        const hashedPassword = await encrypt(password)
        const hashedUser = { password: hashedPassword, ...rest }
        const result = await this.repository.registerUser(hashedUser)
        if (!result.acknowledged) throw new Error(result.error!) // 500
    }
}
