import { UserBase, UserResponse } from '@src/models/User'
import { DefaultResponse } from '../database/default-response'

export interface UserRepositoryIf {
    registerUser(user: UserBase): Promise<DefaultResponse<UserResponse>>
    findUser(email: string): Promise<DefaultResponse<Array<UserResponse>>>
    findUserById(id: string): Promise<DefaultResponse<Array<UserResponse>>>
}
