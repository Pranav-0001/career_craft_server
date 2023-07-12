import mongoose, { ObjectId } from "mongoose";


export interface applied {
    user:mongoose.Types.ObjectId,
    appliedOn:string,
    status:string
}

export interface Job {
    
    title:string;
    category:string;
    qualification:string;
    experience:string;
    deadline:string
    desc:string;
    jobType:string;
    salaryType:string;
    rangeSalary?:string
    salaryFrom?:number
    salaryTo?:number
    fixedSalary?:number
    EmployerId:ObjectId
    status?:boolean
    Employer?: any[];
    savedBy?:ObjectId[]
    appliedBy?:ObjectId[]
    
    
}