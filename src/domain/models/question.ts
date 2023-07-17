import mongoose from "mongoose";

export interface QuestionType{
    question:string,
    answer:string,
    options:string[],
    role:string,
    addedBy:mongoose.Types.ObjectId,
    code?:string,
    difficulty:string,
    status?:boolean
}