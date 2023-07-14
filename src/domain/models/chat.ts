import mongoose from "mongoose";

export interface Chat{
    chatName:string,
    users:mongoose.Types.ObjectId[],
    latestMessage?:mongoose.Types.ObjectId,
    
}

export interface Message{
    sender:mongoose.Types.ObjectId
    content:string
    chat:mongoose.Types.ObjectId
}