import bcryptjs from 'bcryptjs'

export const hashPassword = async (password: string ): Promise<string> => {
    try {
        const saltRounds = 12;
        const hashedPassword = await bcryptjs.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        return ""
        console.log(error)
    }
}

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    return await bcryptjs.compare(password, hashedPassword)
}