import { Request,Response } from "express"
import {jobModel} from '../../infra/Database/jobModel'
import { JobRepositoryImpl } from "../../infra/repositories/jobRepository"
import {  bookmarkJob, getBookmarked, getJobData, getJobs, getJobsCount, removeBookmarkJob } from "../../app/usecases/user/getJobs"
import { getDomain } from "../../app/usecases/user/getDomain"

const empDB=jobModel

const jobRepository=JobRepositoryImpl(empDB)

export const getAllJobs=async(req:Request,res:Response)=>{
    try{
        const page:number=req.query.page ? parseInt(req.query.page.toString()) : 1 

        const sort     = req.query?.sort?.toString()??null
        const domain   = req.query.domain?.toString()??null
        const salary   = req.query.salary?.toString()??null
        const type     = req.query.type?.toString()??null
        
        const jobs=await getJobs(jobRepository)(page,domain,salary,type,sort)
        const JobsCount= await getJobsCount(jobRepository)(domain,salary,type)
        
        console.log(JobsCount);
        let pagecount:number[] = []
        for(let i=1;i<=Math.ceil(JobsCount/5);i++){ 
            pagecount.push(i)
        }
        res.json({jobs,pagecount})
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

export const getSingleJOb=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params
        const jobData:any=await getJobData(jobRepository)(id)
       
        
        res.status(201).json({job:jobData[0]})
        
    } catch (error) {
        
    }
}

export const bookmarkCntrl=async(req:Request,res:Response)=>{
    try {
        const {jobId,user} = req.body
        const result=await bookmarkJob(jobRepository)(jobId,user)
        console.log(result);
        res.status(201).json({message:"success"})
    } catch (error) {
        
    }
}
export const removeBookmarkCntrl=async(req:Request,res:Response)=>{
    try {
        const {jobId,user} = req.body
        const result=await removeBookmarkJob(jobRepository)(jobId,user)
        console.log(result);
        res.status(201).json({message:"success"})
        
    } catch (error) {
        
    }
}



export const getSavedJobsCntrl=async(req:Request,res:Response)=>{
    try {
        const {user}=req.query
        if(user) {
            const saved=await getBookmarked(jobRepository)(user?.toString())
            res.status(201).json({saved})
        }
        
    } catch (error) {
        
    }
}