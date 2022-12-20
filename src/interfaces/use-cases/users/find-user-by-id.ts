import { UserResponse } from '@src/models/User'

export interface FindUserByIdUseCaseIf {
    execute(id: string): Promise<UserResponse>
}
