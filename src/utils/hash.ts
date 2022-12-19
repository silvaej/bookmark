import bcrypt from 'bcrypt'

export async function encrypt(password: string): Promise<string> {
    return await bcrypt.hash(password, 10)
}

export async function verify(plainText: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(plainText, hashed)
}
