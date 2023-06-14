import express from 'express'
import dotenv from 'dotenv'


dotenv.config()

let port=process.env.PORT
const app=express()

app.listen(port , ()=>{
    console.log(`Connected to PORT : ${port}`);
    
}) 