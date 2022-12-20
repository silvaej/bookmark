import { UserResponse } from '@src/models/User'

export interface LoginUseCaseIf {
    execute(email: string, password: string): Promise<UserResponse>
}
