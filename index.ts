import express from 'express'
import dotenv from 'dotenv'
import userRouter from './src/Interfaces/Routes/userRouter'
import employerRouter from './src/Interfaces/Routes/employerRouter'
import adminRouter from './src/Interfaces/Routes/adminRoute'
import messageRouter from './src/Interfaces/Routes/messageRoute'

import { db } from './src/infra/Database/config'

import cookieParser from 'cookie-parser'
import { Socket } from 'socket.io'
import { newMessageRecieved } from './src/domain/models/chat'



const cors=require('cors')
dotenv.config()

let port=process.env.PORT
const app=express()
app.use(express.json());
app.use(cors({
    origin: ["https://careercraft.vercel.app"],
    methods: ["GET", "POST" ,"PUT"],
    credentials: true
}))
app.use(cookieParser())

app.use("/",userRouter)
app.use("/employer",employerRouter)
app.use("/admin",adminRouter)
app.use("/msg",messageRouter)

db()
const server= app.listen(port , ()=>{
    console.log(`Connected to PORT : ${port}`);
    
}) 
const io=require('socket.io')(server , {
    pingTimeout:60000,
    cors:{
        origin:'*'
        // origin:'http://10.4.3.148:3000'
    },
})

io.on("connection",(socket:any)=>{
    
    socket.on('setup',(userId:string)=>{
        console.log(userId);
        
        socket.join(userId)
        socket.emit('connected')
    })

    socket.on('join chat',(room:string)=>{
        socket.join(room)
        console.log("User Joined room : " + room);  
    })

    socket.on('new message',(newMessageRecieved:newMessageRecieved)=>{
        let chat=newMessageRecieved.chat
        
        
        if(!chat.users) return console.log("Chat.users not defiend");
        chat.users.forEach((user)=>{
            if(user._id === newMessageRecieved.sender._id) return
            socket.in(user._id).emit('message recieved',newMessageRecieved)
        })
          
    })

    

    socket.on('join:video',({room,user}:{room:string,user:string})=>{
        socket.join(room)
        io.to(room).emit('joined',user)
        console.log(`User ${user} joined video : ${room}`);
    })
    
    socket.on('offer',({offer,roomId}:{ offer: RTCSessionDescriptionInit,roomId:string })=>{
       io.to(roomId).emit('offer:recieved',offer)
    })

    socket.on('answer',({answer,roomId}:{ answer: RTCSessionDescriptionInit,roomId:string })=>{
        console.log(answer,roomId);
       io.to(roomId).emit('answer:recieved',answer)
       
       

       
    })

    socket.on('ICE',({candidate,roomId}:{candidate:any,roomId:string})=>{
        console.log({candidate,roomId});
        io.to(roomId).emit('candidate',candidate)
    })

    socket.on('call end',(room:string)=>{
        const status=true
        io.to(room).emit('disconnect call',status)
        
    })

    
   
})
