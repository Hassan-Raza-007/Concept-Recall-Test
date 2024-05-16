import express from 'express'
import cors from 'cors'
const router = express.Router()
import {signupUser, loginUser,getProfile, todo, gettodo,checkbox}  from '../controllers/authController'

const corsOptions = {
    credentials: true,
    origin: 'http://localhost:5173'
}

// middleware
router.use(cors(corsOptions))

// router.get('/', test)
router.post('/signup', signupUser)
router.post('/login', loginUser)
router.get('/profile',getProfile)
router.post('/add',todo)
router.get('/get',gettodo)
router.put('/update/:id',checkbox)


export default router
