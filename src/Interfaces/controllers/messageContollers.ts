import { Request,Response } from "express"
import { Message } from "../../domain/models/chat"
import { getAllMessages, sendingMessage } from "../../app/usecases/Message/Message"
import { MsgRepositoryEmpl } from "../../infra/repositories/MessageRepository"
import { MsgModel } from "../../infra/Database/messageModal"

const MsgRepository=MsgRepositoryEmpl(MsgModel)

export const sendMessage=async(req:Request,res:Response)=>{
    const {content,chatId,senderId}=req.body
    const msg=await sendingMessage(MsgRepository)(chatId,senderId,content)
    res.json({msg})

}

export const getMessagesByChatId=async(req:Request,res:Response)=>{
    const chatId=req.params.chatId
    const messages=await getAllMessages(MsgRepository)(chatId)
    res.status(201).json({messages})
}