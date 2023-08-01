import mongoose, { UpdateWriteOpResult, mongo } from "mongoose"
import { MongoDBPublicAns } from "../Database/PublicAnswer"
import { PublicAnswer } from "../../domain/models/publicQuestion"


export type publicAnsRepository={
    create:(Qid:string,answer:string,userId:string,code?:string)=>Promise<PublicAnswer>
    getMyAns:(qId:string,userId:string)=>Promise<PublicAnswer |null>
    updateMyans:(ansId:string,answer:string,code?:string)=>Promise<UpdateWriteOpResult>
    getAnsByQid:(qId:string)=>Promise<PublicAnswer[]>
    likeAnswer:(ansId:string,userId:string)=>Promise<UpdateWriteOpResult>
    undoLike:(ansId:string,userId:string)=>Promise<UpdateWriteOpResult>
    getANswerByUser:(userId:string)=>Promise<PublicAnswer[]>
    getLASpoint:(userId:string)=>Promise<number[]>


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
    const getMyAns=async(qId:string,userId:string)=>{
        const que=new mongoose.Types.ObjectId(qId)
        const user=new mongoose.Types.ObjectId(userId)
        console.log({que,user});
        
        
        const data=await PublicAnsModel.findOne({questionId:que,addedBy:user}).populate('addedBy')

        return data
    }
    const updateMyans=async(ansId:string,answer:string,code?:string)=>{
        const ans=new mongoose.Types.ObjectId(ansId)
        const data=await PublicAnsModel.updateOne({_id:ans},{$set:{answer:answer,code:code}})
        return data
    }
    const getAnsByQid=async (qId:string)=>{
        const que=new mongoose.Types.ObjectId(qId)
        const data=await PublicAnsModel.find({questionId:que}).sort({likes:-1}).populate('addedBy')
        return data
    }
    const likeAnswer=async(ansId:string,userId:string)=>{
        const ans=new mongoose.Types.ObjectId(ansId)
        const data=await PublicAnsModel.updateOne({_id:ans},{$push:{likedBy:userId},$inc:{likes:1}})
        console.log(data);
        
        return data
    }
    const undoLike=async(ansId:string,userId:string)=>{
        const ans=new mongoose.Types.ObjectId(ansId)
        
        
        const data=await PublicAnsModel.updateOne({_id:ans},{$pull:{likedBy:userId},$inc:{likes:-1}})
        return data

    }

    const getANswerByUser=async(userId:string)=>{
        const user=new mongoose.Types.ObjectId(userId)
        const res=await PublicAnsModel.find({addedBy:user}).populate('questionId')
        return res
    }

    const getLASpoint=async(userId:string)=>{
        const id=new mongoose.Types.ObjectId(userId)
        const res=await PublicAnsModel.aggregate([
            {
                $match:{
                    addedBy:id
                }
            },
            {
                $group: {
                  _id: null,
                  totalMarks: { $sum: "$likes" }
                }
            }
        ])
        return res
    }
    return{
        create,
        getMyAns,
        updateMyans,
        getAnsByQid,
        likeAnswer,
        undoLike,
        getANswerByUser,
        getLASpoint
    }
}