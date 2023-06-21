import { Job } from "../../domain/models/job";
import { MongoDBJob } from "../Database/jobModel";

export type jobRepository={
    addJob:(jobData:Job)=>Promise<Job>
}
export const JobRepositoryImpl = (jobModel:MongoDBJob):jobRepository=>{

    const addJob=async(job:Job):Promise<Job>=>{

        const createdJob=await jobModel.create(job)
        return createdJob.toObject()
    }

    return {
        addJob
    }
}