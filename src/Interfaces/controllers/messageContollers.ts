import { Request,Response } from "express"
import { Message } from "../../domain/models/chat"
import { getAllMessages, sendingMessage } from "../../app/usecases/Message/Message"
import { MsgRepositoryEmpl } from "../../infra/repositories/MessageRepository"
import { MsgModel } from "../../infra/Database/messageModal"

const MsgRepository=MsgRepositoryEmpl(MsgModel)

export const sendMessage=async(req:Request,res:Response)=>{
    try {
        const {content,chatId,senderId,isExam,isVideo}=req.body
    const msg=await sendingMessage(MsgRepository)(chatId,senderId,content,isExam,isVideo)
    res.json({msg})
    } catch (error) {
        
    }
    

}

export const getMessagesByChatId=async(req:Request,res:Response)=>{
    try {
        const chatId=req.params.chatId
    const messages=await getAllMessages(MsgRepository)(chatId)
    res.status(201).json({messages})
    } catch (error) {
        
    }
}