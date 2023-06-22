import mongoose, { Model, Schema ,Document } from "mongoose";
import { Job } from "../../domain/models/job";

export type MongoDBJob=Model<Document<any,any,any>&Job>;

const jobSchema= new Schema<Job>({
    title:{
        type:'string',
        required:true
    },
    category:{
        type:'string',
        required:true
    },
    experience:{
        type:'string',
        required:true
    },
    deadline:{
        type:'string',
        required:true
    },
    jobType:{
        type:'string',
        required:true
    },
    qualification:{
        type:'string',
        required:true
    },
    salaryType:{
        type:"string",
        required:true
    },
    fixedSalary:{
        type:'string',
        
    },
    rangeSalary:{
        type:'string',
       
    },
    desc:{
        type:'string',
        required:true
    },
    EmployerId:{
        type:'string',
        required:true
    },
    staus:{
        type:'boolean',
        default:true
    }
})

export const jobModel:MongoDBJob=mongoose.connection.model<Document<any, any, any> & Job>('job', jobSchema);