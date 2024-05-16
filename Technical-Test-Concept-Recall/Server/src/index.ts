import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoutes from './routes/authRoutes'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'



// const DATABASE_USERNAME = process.env
// console.log(DATABASE_USERNAME)

mongoose.connect('mongodb+srv://hassanraza:test1234@cluster0.tms0l8o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>console.log('Database Connected'))
.catch((err)=> console.log('Database not Connected',err))

const app = express()

//middeware
// app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))

app.use('/',authRoutes)



app.listen(8000,()=>{
    console.log("Server is Running")
})