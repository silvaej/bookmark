import { UserBase, UserResponse } from '@src/models/User'

export interface SignUpUseCaseIf {
    execute(user: UserBase): Promise<void>
}
