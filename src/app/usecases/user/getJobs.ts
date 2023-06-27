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