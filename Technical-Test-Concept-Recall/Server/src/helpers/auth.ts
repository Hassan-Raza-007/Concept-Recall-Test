import bcrypt from 'bcrypt'

const hashPassword = (password: string): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        bcrypt.genSalt(12, (err, salt: string) => {
            if (err) {
                reject(err)
            }
            bcrypt.hash(password, salt as string, (err, hash: string) => {
                if (err) {
                    reject(err)
                }
                resolve(hash)
            })
        })
    })
}


const comparePassword = (password: string, hashed: string):Promise<boolean> => {
    return bcrypt.compare(password, hashed)
}

export { hashPassword, comparePassword }