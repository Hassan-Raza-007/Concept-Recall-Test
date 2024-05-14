import user from '../models/users'
import { error } from 'console'
import { Request, Response } from 'express'

const test = (req: Request, res: Response) => {
    res.json('test is working')
}

const signupUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body

        //check name is enter
        if (!name) {
            return res.json({
                error: 'name is required'
            })
        }
        //check password 
        if (!password || password.length < 6) {
            return res.json({
                error: 'password is required and should be 6 characters'
            })
        }
        //check email

        const exist = await user.findOne({ email })
        if (exist) {
            return res.json({
                error: 'email already exist'
            })
        }

        const User = await user.create({
            name, email, password
        })

        return res.json(User)
    } catch (error) {
        console.log(error)
    }
}

export { test, signupUser }