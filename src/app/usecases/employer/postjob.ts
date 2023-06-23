import { jobRepository } from "../../../infra/repositories/jobRepository";
import { Job } from "../../../domain/models/job";
import { ObjectId } from "mongoose";

export const addJobEmp=(jobrepository:jobRepository)=>async(title:string,category:string,qualification:string,experience:string,deadline:string,salaryType:string,desc:string,jobType:string,rangeSalary:string,fixedSalary:string,EmployerId:ObjectId)=>{

    const newjob:Job={
        title,
        category,
        qualification,
        experience,
        deadline,
        salaryType,
        jobType,
        desc,
        fixedSalary,
        rangeSalary,
        EmployerId,
    }
    const createdJob=await jobrepository.addJob(newjob)
    return createdJob


}