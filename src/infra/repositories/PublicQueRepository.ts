import mongoose, { UpdateWriteOpResult } from "mongoose"
import { PublicQuestion } from "../../domain/models/publicQuestion"
import { MongoDBPublicQue } from "../Database/PublicQuestionModel"

export type publicQuestionRepository={
    createQuestion:(title:string,question:string,addedBy:string,language:string,code?:string)=>Promise<PublicQuestion>
    getPublicQuestions:(page:number,filter? :string)=>Promise<{questions: PublicQuestion[]; count: number; languages:string[] }>
    getPublicQuestionById:(id:string)=>Promise<PublicQuestion|null>
    updateAnsArray:(id:string,user:string)=>Promise<UpdateWriteOpResult>
}

export const publicQuestionRepositoryImpl = (PublicQueModel:MongoDBPublicQue):publicQuestionRepository=>{
    const createQuestion=async(title:string,question:string,addedBy:string,language:string,code?:string)=>{
        const Que={
            title,
            question,
            addedBy:new mongoose.Types.ObjectId(addedBy),
            language:language.toLowerCase(),
            code
        }
        const data=await PublicQueModel.create(Que)
        return data
    }

    const getPublicQuestions=async(page:number,filter?:string)=>{
       const skip=(page-1)*6
       const languages=await PublicQueModel.distinct('language')
        if(filter){
            const filterRegex = new RegExp(filter, 'i');
            const questions=await PublicQueModel.find({language:filterRegex}).sort({likes:-1}).skip(skip).limit(6)
            const count=await PublicQueModel.countDocuments({language:filterRegex})
            return {questions,count,languages}
        }else{
            
            const questions=await PublicQueModel.find().sort({likes:-1}).skip(skip).limit(6)
            const count=await PublicQueModel.countDocuments()
            return {questions,count,languages}
        }
    }

    const getPublicQuestionById=async(id:string)=>{
        const qId=new mongoose.Types.ObjectId(id)
        const question=await PublicQueModel.findOne({_id:qId}).populate('addedBy')
        return question
    }

    const updateAnsArray=async(id:string,userId:string)=>{
        const qId=new mongoose.Types.ObjectId(id)
        const res=await PublicQueModel.updateOne({_id:qId}, { $push: { answeredBy: new mongoose.Types.ObjectId(userId) } })
        return res
    }

    return {
        createQuestion,
        getPublicQuestions,
        getPublicQuestionById,
        updateAnsArray
    }
}
