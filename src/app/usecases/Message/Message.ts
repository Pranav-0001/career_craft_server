import { MessageRepository } from "../../../infra/repositories/MessageRepository";




export const sendingMessage=(MessageRepository:MessageRepository)=>async(chatId:string,senderId:string,content:string)=>{
   const message=await MessageRepository.sendMsg(chatId,senderId,content)
   return message
}

export const getAllMessages=(MessageRepository:MessageRepository)=>async(chatId:string)=>{
    const messages=await MessageRepository.getMsgsByChatId(chatId)
    return messages
}