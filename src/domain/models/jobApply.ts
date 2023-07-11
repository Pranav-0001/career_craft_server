import mongoose from "mongoose";

export interface JobApplication{
    userId:mongoose.Types.ObjectId
    empId:mongoose.Types.ObjectId
    jobId:mongoose.Types.ObjectId
    appliedOn:string
    status:string
    
}