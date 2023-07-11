import mongoose, { Model, Schema ,Document } from "mongoose";
import { JobApplication } from "../../domain/models/jobApply";

export type MongoDBJobApply=Model<Document<any,any,any>&JobApplication>;

const JobApplicationSchema=new Schema<JobApplication>({
    jobId:{
        type:'ObjectId'
    },
    empId:{
        type:'ObjectId'
    },
    userId:{
        type:'ObjectId'
    },
    appliedOn:{
        type:'string'
    },
    status:{
        type:"string"
    }
})

export const jobApplyModel:MongoDBJobApply=mongoose.connection.model<Document<any,any,any>&JobApplication>("applications",JobApplicationSchema)