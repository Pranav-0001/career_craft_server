import mongoose from "mongoose";
import { User } from "./user";
import { examType } from "./exam";

export interface Chat{
    chatName:string,
    users:mongoose.Types.ObjectId[],
    latestMessage?:mongoose.Types.ObjectId,
    
}

export interface Message{
    sender:mongoose.Types.ObjectId
    content:string
    chat:mongoose.Types.ObjectId,
    isExam?:boolean
    Exam?:mongoose.Types.ObjectId,
    isVideo?:boolean
}

export interface newMessageRecieved{
    _id:string,
    sender:Sender,
    content:string,
    chat:ChatInMsg

}
interface Sender{
    _id:string,
    username: string,
    firstname: string,
    lastname: string,
    profileIm:string
}
interface ChatInMsg{
    _id:string,
    users:User[],
    
}