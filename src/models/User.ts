export interface UserBase {
    username: string
    email: string
    password: string
    type: 'user' | 'admin'
}

export interface UserResponse extends UserBase {
    id: string
}
