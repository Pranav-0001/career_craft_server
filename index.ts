import express from 'express'
import dotenv from 'dotenv'
import userRouter from './src/Interfaces/Routes/userRouter'
import { db } from './src/infra/Database/config'
dotenv.config()

let port=process.env.PORT
const app=express()
app.use(express.json());
app.use("/",userRouter)

app.listen(port , ()=>{
    console.log(`Connected to PORT : ${port}`);
    
}) 
db()