import { chatRepository } from "../../../infra/repositories/chatRepository";

export const createChat=(chatRepository:chatRepository)=>async(empId:string,userId:string)=>{
    const res=await chatRepository.createChat(empId,userId)
    return res
}

export const getChats=(chatRepository:chatRepository)=>async(userId:string)=>{
    const chats=await chatRepository.getAllChats(userId)
    return chats
}