import express from 'express'
import dotenv from 'dotenv'
import userRouter from './src/Interfaces/Routes/userRouter'
import employerRouter from './src/Interfaces/Routes/employerRouter'
import { db } from './src/infra/Database/config'

import cookieParser from 'cookie-parser'



const cors=require('cors')
dotenv.config()

let port=process.env.PORT
const app=express()
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}))
app.use(cookieParser())

app.use("/",userRouter)
app.use("/employer",employerRouter)

app.listen(port , ()=>{
    console.log(`Connected to PORT : ${port}`);
    
}) 
db()