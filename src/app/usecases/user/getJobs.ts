import { Job } from "../../../domain/models/job"
import { jobRepository } from "../../../infra/repositories/jobRepository"


export const getJobs=(jobRepository:jobRepository)=>async():Promise<Job[]>=>{
    
    const jobs = await jobRepository.getJobs()
    return jobs
}