import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoutes from './routes/authRoutes'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'


mongoose.connect('mongodb+srv://hassanra34:FxvGligA6iw9awGy@cluster0.tms0l8o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>console.log('Database Connected'))
.catch((err)=> console.log('Database not Connected',err))

const app = express()

//middeware
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))

app.use('/',authRoutes)

app.listen(8000,()=>{
    console.log("Server is Running")
})