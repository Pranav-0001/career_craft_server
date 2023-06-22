import { jobRepository } from "../../../infra/repositories/jobRepository";
import { Job } from "../../../domain/models/job";

export const getEmpJobs=(jobRepository:jobRepository)=>async(id:string):Promise<Job[]>=>{
    const jobs=await jobRepository.getEmpJobs(id)
    return jobs
}
