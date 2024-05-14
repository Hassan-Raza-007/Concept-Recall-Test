import bcrypt from 'bcrypt'

const hashPassword = (password: string): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        bcrypt.genSalt(12, (err: Error, salt: string) => {
            if (err) {
                reject(err)
            }
            bcrypt.hash(password, salt as string, (err: Error, salt: string) => {
                if (err) {
                    reject(err)
                }
                resolve(hash as string)
            })
        })
    })
}


const comparePassword = (password: string, hashed: string):Promise<boolean> => {
    return bcrypt.compare(password, hashed)
}

export { hashPassword, comparePassword }