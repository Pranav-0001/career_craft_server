import { MongoDBMessage,MsgModel } from "../Database/messageModal";
import { Message } from "../../domain/models/chat";
import mongoose from "mongoose";
import { userModel } from "../Database/userModel";
import { User } from "../../domain/models/user";
import { chatModel } from "../Database/chatModel";

export type MessageRepository={
    sendMsg:(chatId:string,sender:string,content:string,isExam?:boolean,isVideo?:boolean)=>Promise<Message >
    getMsgsByChatId:(chatId:string)=>Promise<Message[]>
}

export const MsgRepositoryEmpl=(MessageModel:MongoDBMessage):MessageRepository=>{
    const sendMsg=async(chatId:string,sender:string,content:string,isExam?:boolean,isVideo?:boolean):Promise<Message >=>{
        const newChat:Message={
            sender:new mongoose.Types.ObjectId(sender),
            content,
            chat:new mongoose.Types.ObjectId(chatId),
            isExam,
            Exam:isExam ?  new mongoose.Types.ObjectId(content) : undefined,
            isVideo
        }
        let message=await MsgModel.create(newChat)
        message =await message.populate("sender",'_id firstname lastname username profileImg')   
        message=await message.populate('chat')
        message=await message.populate('chat.users')
        message=await message.populate('Exam')

        await chatModel.updateOne({_id:new mongoose.Types.ObjectId(chatId)},{$set:{latestMessage:message}})

        return message
    }
    const getMsgsByChatId=async(chatId:string):Promise<Message[]>=>{
        const messags=await MessageModel.find({chat:new mongoose.Types.ObjectId(chatId)}).populate("sender",'firstname lastname username profileImg').populate('Exam')
        .populate('chat')
        return messags
    }
    return{
        sendMsg,
        getMsgsByChatId
    }
}