import user from '../models/users'
import { Request, Response } from 'express'
import { hashPassword, comparePassword } from '../helpers/auth'
import jwt, { Secret } from 'jsonwebtoken'


const test = (req: Request, res: Response) => {
    res.json('test is working')
}

//signip endpoint

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

        const hashedPassword = await hashPassword(password)
        //create user in db
        const User = await user.create({
            name,
            email,
            password: hashedPassword,
        })

        return res.json(User)
    } catch (error) {
        console.log(error)
    }
}



// login end point
const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        // Check if user exists
        const User = await user.findOne({ email })
        if (!User) {
            return res.json({
                error: 'No user found'
            })
        }

        // Check if User.password is null or undefined
        if (User.password === null || User.password === undefined) {
            return res.json({
                error: 'Password not set for user'
            })
        }

        // Compare passwords
        const match = await comparePassword(password, User.password)
        if (!match) {
            return res.json({
                error: 'Incorrect password'
            })
        }

    // If password matches and JWT_SECRET is defined, generate JWT token
    if (process.env.JWT_SECRET) {
        jwt.sign({ email: User.email, id: User._id, name: User.name }, process.env.JWT_SECRET as Secret, {}, (err, token) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            // Set the token as a cookie
            res.cookie('token', token).json(User);
        });
    } else {
        console.error('JWT_SECRET is not defined');
        return res.status(500).json({ error: 'Internal server error' });
    }

} catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
}
};


export { test, signupUser, loginUser }