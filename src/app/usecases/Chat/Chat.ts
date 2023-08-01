import { chatRepository } from "../../../infra/repositories/chatRepository";

export const createChat=(chatRepository:chatRepository)=>async(empId:string,userId:string)=>{
    const res=await chatRepository.createChat(empId,userId)
    return res
}

export const getChats=(chatRepository:chatRepository)=>async(userId:string)=>{
    const chats=await chatRepository.getAllChats(userId)
    return chats
}

export const chatCount=(chatRepository:chatRepository)=>async(userId:string)=>{
    const count=await chatRepository.getChatCount(userId)
    return count
}