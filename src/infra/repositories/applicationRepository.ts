import { MongoDBJobApply, jobApplyModel } from "../Database/applyModel";
import { JobApplication, JobApplyDetailed } from "../../domain/models/jobApply";
import mongoose, { UpdateWriteOpResult } from "mongoose";

export type applicationRepository={
    addApplication:(jobId:string,empId:string,userId:string)=>Promise<JobApplication>
    getApplicationByUser:(userId:string)=>Promise<JobApplyDetailed[]>
    get5ApplicationByUser:(userId:string)=>Promise<JobApplyDetailed[]>
    getApplicationByEmp:(userId:string,page:string)=>Promise<JobApplyDetailed[]>
    getApplicationCountEmp:(EmpId:string)=>Promise<any>
    updateApplicationEmp:(appId:string,status:string)=>Promise<UpdateWriteOpResult>
    getApplicationCountByCanId:(cId:string)=>Promise<number>
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
    const get5ApplicationByUser=async(userId:string):Promise<JobApplyDetailed[]>=>{
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
          },
          {
            $limit:5
          }
      ])
      return applied
  }
    const getApplicationByEmp=async(empId:string,page:string):Promise<JobApplyDetailed[]>=>{
        const skip=(parseInt(page)-1)*10
        let id=new mongoose.Types.ObjectId(empId)

        const applied = await jobApplyModel.aggregate([
            {
              $match: { empId:id }
            },
            {
              $lookup: {
                from: 'jobs',
                localField: 'jobId',
                foreignField: '_id',
                as: 'job'
              }
            },
            {
              $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'user'
              }
            },
            {
              $skip: skip
            },
            {
              $limit: 10
            }
          ]);

          return applied
    }

    const getApplicationCountEmp=async(empId:string):Promise<any>=>{
        let id=new mongoose.Types.ObjectId(empId)

        const applied = await jobApplyModel.aggregate([
            {
              $match: { empId:id }
            },
            {
              $count: 'total'
            }
        ])
        
        
        return applied[0].total
    }

    const updateApplicationEmp=async(appId:string,status:string):Promise<UpdateWriteOpResult>=>{
      const id=new mongoose.Types.ObjectId(appId)
      const res=await applyModel.updateOne({_id:id},{$set:{status:status}})
      return res
    }

    const getApplicationCountByCanId=async(cId:string):Promise<number>=>{
      const id=new mongoose.Types.ObjectId(cId)
      const number= await applyModel.countDocuments({userId:id})
      return number
      
    }
    
    return {
        addApplication,
        getApplicationByUser,
        getApplicationByEmp,
        getApplicationCountEmp,
        updateApplicationEmp,
        getApplicationCountByCanId,
        get5ApplicationByUser
    }
}