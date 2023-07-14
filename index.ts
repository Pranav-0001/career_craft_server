import express from 'express'
import dotenv from 'dotenv'
import userRouter from './src/Interfaces/Routes/userRouter'
import employerRouter from './src/Interfaces/Routes/employerRouter'
import adminRouter from './src/Interfaces/Routes/adminRoute'
import messageRouter from './src/Interfaces/Routes/messageRoute'

import { db } from './src/infra/Database/config'

import cookieParser from 'cookie-parser'



const cors=require('cors')
dotenv.config()

let port=process.env.PORT
const app=express()
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST" ,"PUT"],
    credentials: true
}))
app.use(cookieParser())

app.use("/",userRouter)
app.use("/employer",employerRouter)
app.use("/admin",adminRouter)
app.use("/msg",messageRouter)

db()
app.listen(port , ()=>{
    console.log(`Connected to PORT : ${port}`);
    
}) 
