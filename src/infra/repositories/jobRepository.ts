import { promises } from "dns";
import { Job } from "../../domain/models/job";
import { MongoDBJob } from "../Database/jobModel";

export type jobRepository={
    addJob:(jobData:Job)=>Promise<Job>;
    getEmpJobs:(id:string)=>Promise<Job[]>
}
export const JobRepositoryImpl = (jobModel:MongoDBJob):jobRepository=>{

    const addJob=async(job:Job):Promise<Job>=>{
        const createdJob=await jobModel.create(job)
        return createdJob.toObject()
    }

    const getEmpJobs=async(id:string):Promise<Job[]>=>{
        const jobs=await jobModel.find({EmployerId:id})
        return jobs
    }

    return {
        addJob,
        getEmpJobs
    }
}