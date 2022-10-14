import bycrypt from "bcrypt";

export async function hashPassword(password: string): Promise<string> {
    const salt = await bycrypt.genSalt(6)
    const hash = await bycrypt.hash(password, salt)
    return hash
}

export async function hashCompare(password: string, db_password: string): Promise<boolean> {
    const validPassword = await bycrypt.compare(password, db_password)

    return validPassword
}