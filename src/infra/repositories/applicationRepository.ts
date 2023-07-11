import { MongoDBJobApply } from "../Database/applyModel";
import { JobApplication } from "../../domain/models/jobApply";

export type applicationRepository={
    addApplication:(jobId:string,empId:string,userId:string)=>Promise<JobApplication>
}

export const applicationRepositoryEmpl=(applyModel:MongoDBJobApply):applicationRepository=>{
    const addApplication=async(jobId:string,empId:string,userId:string):Promise<JobApplication>=>{
        const today = new Date();
        const dd = today.getDate();
        const mm = today.getMonth() + 1;
        const yyyy = today.getFullYear();
        const formattedDate = `${dd}/${mm}/${yyyy}`;
        const data={
            jobId,
            empId,
            userId,
            appliedOn:formattedDate,
            status:"Applied"
        }
        const appliedjob=await applyModel.create(data)
        return appliedjob
    }

    return {
        addApplication
    }
}