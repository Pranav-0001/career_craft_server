import mongoose from "mongoose";
import { Job } from "./job";
import { User } from "./user";

export interface JobApplication{
    userId:mongoose.Types.ObjectId
    empId:mongoose.Types.ObjectId
    jobId:mongoose.Types.ObjectId
    appliedOn:string
    status:string
    
}
export interface JobApplyDetailed{
    _id:mongoose.Types.ObjectId
    empId:mongoose.Types.ObjectId
    jobId:mongoose.Types.ObjectId
    appliedOn:string
    status:string
    jobs:Job[]
    employer:User[]
}