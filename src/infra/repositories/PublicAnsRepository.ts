import mongoose from "mongoose"
import { MongoDBPublicAns } from "../Database/PublicAnswer"
import { PublicAnswer } from "../../domain/models/publicQuestion"


export type publicAnsRepository={
    create:(Qid:string,answer:string,userId:string,code?:string)=>Promise<PublicAnswer>
}

export const publicAnswerRepositoryImpl = (PublicAnsModel:MongoDBPublicAns):publicAnsRepository=>{
    const create=async(Qid:string,answer:string,userId:string,code?:string)=>{
        const data:PublicAnswer={
            questionId:new mongoose.Types.ObjectId(Qid),
            answer,
            addedBy:new mongoose.Types.ObjectId(userId),
            code,
            status:true
        }
        
        const res=await PublicAnsModel.create(data)
        return res
    }
    return{
        create
    }
}