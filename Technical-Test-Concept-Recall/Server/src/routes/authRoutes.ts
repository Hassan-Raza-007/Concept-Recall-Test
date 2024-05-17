import express from 'express'
import cors from 'cors'
const router = express.Router()
import {signupUser, loginUser,getProfile, todo, gettodo,checkbox, deletetodo,authenticate}  from '../controllers/authController'

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
router.post('/add', authenticate,todo)
router.get('/get',authenticate,gettodo)
router.put('/update/:id',authenticate,checkbox)
router.delete('/delete/:id',authenticate,deletetodo)


export default router