import express from 'express'
import cors from 'cors'
const router = express.Router()
import {test, signupUser}  from '../controllers/authController'

const corsOptions = {
    credentials: true,
    origin: 'http://localhost:5173'
}

// middleware
router.use(cors(corsOptions))

router.get('/', test)
router.post('/signup', signupUser)

export default router
