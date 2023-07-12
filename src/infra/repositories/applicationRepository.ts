import { MongoDBJobApply, jobApplyModel } from "../Database/applyModel";
import { JobApplication, JobApplyDetailed } from "../../domain/models/jobApply";
import mongoose from "mongoose";

export type applicationRepository={
    addApplication:(jobId:string,empId:string,userId:string)=>Promise<JobApplication>
    getApplicationByUser:(userId:string)=>Promise<JobApplyDetailed[]>
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

    const getApplicationByUser=async(userId:string):Promise<JobApplyDetailed[]>=>{
        let id=new mongoose.Types.ObjectId(userId)
        const applied=await jobApplyModel.aggregate([
            {
            $match:{userId:id}
            },
            {
                $lookup:{
                    from:'jobs',
                    localField:'jobId',
                    foreignField:'_id',
                    as:'job'
                }
            },
            {
                $lookup:{
                    from:'users',
                    localField:'empId',
                    foreignField:'_id',
                    as:'employer'
                }
            }
        ])
        return applied
    }

    
    return {
        addApplication,
        getApplicationByUser
    }
}