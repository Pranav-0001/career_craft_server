import { Job } from "../../../domain/models/job"
import { jobRepository } from "../../../infra/repositories/jobRepository"


export const getJobs=(jobRepository:jobRepository)=>async(page:number,domain:string|null,salary:string|null,type:string|null,sort:string|null):Promise<Job[]>=>{
    
    const jobs = await jobRepository.getJobs(page,domain,salary,type,sort)
    return jobs
}

export const getJobsCount=(jobrepository:jobRepository)=>async(domain:string|null,salary:string|null,type:string|null):Promise<number>=>{
    const JobsCount= await jobrepository.getJobsCount(domain,salary,type)
    return JobsCount
}

export const getJobData=(jobrepository:jobRepository)=>async(id:string)=>{
    const jobData=await jobrepository.getSingleJob(id)
    
    
    return jobData
}

export const bookmarkJob=(jobrepository:jobRepository)=>async(jobId:string,user:string)=>{
    const response=await jobrepository.saveJob(jobId,user)
    return response
}

export const removeBookmarkJob=(jobrepository:jobRepository)=>async(jobId:string,user:string)=>{
    const response=await jobrepository.removeSaved(jobId,user)
    return response
}



export const getBookmarked=(jobrepository:jobRepository)=>async(user:string)=>{
    const savedJobs= await jobrepository.getBookmarked(user)
    return savedJobs
}

export const addAppliedBy=(jobrepository:jobRepository)=>async(jobId:string,user:string)=>{
    const response=await jobrepository.addToApplied(jobId,user)
    return response
}