import { Request,Response } from "express"
import {jobModel} from '../../infra/Database/jobModel'
import { JobRepositoryImpl } from "../../infra/repositories/jobRepository"
import { getJobs } from "../../app/usecases/user/getJobs"
import { getDomain } from "../../app/usecases/user/getDomain"

const empDB=jobModel

const jobRepository=JobRepositoryImpl(empDB)

export const getAllJobs=async(req:Request,res:Response)=>{
    try{
        const jobs=await getJobs(jobRepository)()
        res.json({jobs})
    }catch(err){
        console.log(err);
        
    }

}

export const getDomains=async(req:Request,res:Response)=>{
    try{
        const domains=await getDomain(jobRepository)()
        res.json({domains})
    }catch(err){
        console.log(err);
        
    }
}