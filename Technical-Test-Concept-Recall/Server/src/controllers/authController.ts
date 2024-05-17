import user from '../models/users'
import todoModel from '../models/todos'
import { NextFunction, Request, Response } from 'express'
import { hashPassword, comparePassword } from '../helpers/auth'
import jwt, { Secret } from 'jsonwebtoken'

declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

// const test = async (req: Request, res: Response) => {
//     res.json('test is working')
// }

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

        // Generate JWT token
        const token = jwt.sign({ userId: User._id }, 'secret_key');
        res.send({ token });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

const getProfile = (req: Request, res: Response) => {
    const JWT_SECRET = process.env.JWT_SECRET
    const token = req.cookies.token;
    if (token && JWT_SECRET) {
        jwt.verify(token, JWT_SECRET as Secret, {}, (err: any, user: any) => {
            if (err) throw err;
            res.json(user);
        })
    } else {
        res.json(null)
    }
}



const todo = (req: Request, res: Response) => {
    const task = req.body.task;
    todoModel.create({
        task: task
    }).then(result => res.json(result))
        .catch(err => res.json(err))
}


const gettodo = (req: Request, res: Response) => {
    todoModel.find()
        .then(result => res.json(result))
        .catch(err => res.json(err))
}

const checkbox = (req: Request, res: Response) => {
    const { id } = req.params
    todoModel.findOneAndUpdate({ _id: id }, { done: true })
        .then(result => res.json(result))
        .catch(err => res.json(err))

}

const deletetodo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await todoModel.findByIdAndDelete(id);
        if (result) {
            res.status(200).json({ message: 'Todo deleted successfully' });
        } else {
            res.status(404).json({ message: 'Todo not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: (err as Error).message });
    }
};


const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const tokenHeader = req.header('Authorization');
    
    if (!tokenHeader) {
        return res.status(401).send('Unauthorized: No token provided');
    }

    const token = tokenHeader.replace('Bearer ', '');

    try {
        const decoded = jwt.verify(token, 'secret_key') as { userId: string };
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).send('Unauthorized: Invalid token');
    }
};
export { signupUser, loginUser, getProfile, todo, gettodo, checkbox, deletetodo, authenticate }