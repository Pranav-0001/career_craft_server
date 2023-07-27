import mongoose from "mongoose"

export interface PublicQuestion{
    title:string,
    language:string,
    question:string,
    addedBy:mongoose.Types.ObjectId
    code?:string,
    likes?:number,
    likedBy?:string[],
    status?:boolean,
    answeredBy?:string[]
}

export interface PublicAnswer{
    answer?:string,
    questionId:mongoose.Types.ObjectId
    code?:string,
    likes?:number,
    likedBy?:string[],
    status?:boolean,
    addedBy:mongoose.Types.ObjectId

    
}