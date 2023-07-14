import { Request,Response } from "express"
import { applicationRepositoryEmpl } from "../../infra/repositories/applicationRepository";
import { chatRepositoryEmpl } from "../../infra/repositories/chatRepository";
import { chatModel } from "../../infra/Database/chatModel";
import { createChat, getChats } from "../../app/usecases/Chat/Chat";
import { jobApplyModel } from "../../infra/Database/applyModel";
import { updateApplicationStatus } from "../../app/usecases/user/jobApplication";

const applyRepository = applicationRepositoryEmpl(jobApplyModel)
const chatRepository=chatRepositoryEmpl(chatModel)


export const acceptApplicationCntroller=async(req:Request,res:Response)=>{
    const {userId,empId,applicationId}=req.body

    if(applicationId) {
        const updateStatus=await updateApplicationStatus(applyRepository)(applicationId,"Accepted")
    }
    const accesChat=await createChat(chatRepository)(empId,userId)
    res.json({accesChat,update:true})
}

export const fetchEmpChatsCntrlr=async(req:Request,res:Response)=>{
    const empId:string=req.params.empId
    const allChats=await getChats(chatRepository)(empId)
    res.status(202).json({chats:allChats})
}