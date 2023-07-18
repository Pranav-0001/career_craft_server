import { jobRepository } from "../../../infra/repositories/jobRepository";
import { Job } from "../../../domain/models/job";
import { ObjectId } from "mongoose";

export const addJobEmp=(jobrepository:jobRepository)=>async(title:string,category:string,qualification:string,experience:string,deadline:string,salaryType:string,desc:string,jobType:string,fixedSalary:number|undefined,EmployerId:ObjectId,salaryFrom:number|undefined,salaryTo:number|undefined)=>{

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
        EmployerId,
        salaryFrom:salaryFrom??fixedSalary,
        salaryTo:salaryTo??fixedSalary
    }
    const createdJob=await jobrepository.addJob(newjob)
    return createdJob


}
export const EditJobEmp=(jobrepository:jobRepository)=>async(title:string,category:string,qualification:string,experience:string,deadline:string,salaryType:string,desc:string,jobType:string,fixedSalary:number|undefined,EmployerId:ObjectId,salaryFrom:number|undefined,salaryTo:number|undefined,job:string)=>{

    const updated:Job={
        title,
        category,
        qualification,
        experience,
        deadline,
        salaryType,
        jobType,
        desc,
        fixedSalary,
        EmployerId,
        salaryFrom:salaryFrom??fixedSalary,
        salaryTo:salaryTo??fixedSalary
    }
    const createdJob=await jobrepository.editJob(updated,job)
    return createdJob


}