import mongoose from "mongoose";
import { QuestionType } from "./question";

export interface examType{
    questions?:QuestionType[]
    employer?:mongoose.Types.ObjectId
    candidate?:mongoose.Types.ObjectId
    answers?:[{queId:mongoose.Types.ObjectId,userAns:string}]
    startedAt?:string,
    attended?:boolean
    submitted?:boolean
    date?:string,
    mark?:number,
    question?:any
}

export interface MockTestType{
    questions?:QuestionType[]
    candidate?:mongoose.Types.ObjectId
    answers?:[{queId:mongoose.Types.ObjectId,userAns:string}]
    startedAt?:string,
    submittedAt?:string
    attended?:boolean
    submitted?:boolean
    date?:string,
    mark?:number,
    question?:any
}