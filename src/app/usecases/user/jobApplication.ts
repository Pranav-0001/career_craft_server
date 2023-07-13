import { JobApplication } from "../../../domain/models/jobApply";
import { applicationRepository } from "../../../infra/repositories/applicationRepository";

export const applyJob=(applicationRepository:applicationRepository)=>async(jobId:string,empId:string,userId:string)=>{
    const applied=await applicationRepository.addApplication(jobId,empId,userId)
    return applied
} 


export const getApplicationByUserId=(applicationRepository:applicationRepository)=>async(userId:string)=>{
    const applied=await applicationRepository.getApplicationByUser(userId)
    return applied
}

export const getApplicationByEmpId=(applicationRepository:applicationRepository)=>async(empId:string,page:string)=>{
    const applied=await applicationRepository.getApplicationByEmp(empId,page)
    return applied
}
export const getCountAppEmp=(applicationRepository:applicationRepository)=>async(empId:string)=>{
    const count = await applicationRepository.getApplicationCountEmp(empId)
    return count
}