import mongoose, { UpdateWriteOpResult } from "mongoose";
import { MongoDBQuestion } from "../Database/questionModel";
import { QuestionType } from "../../domain/models/question";


export type questionRepository={
    createQuestion:(question:string,answer:string,options:string[],difficulty:string,addedBy:string,role:string,code?:string)=>Promise<QuestionType>
    getQuestions:(page:string,empId:string)=>Promise<QuestionType[]>
    getCount:(empId:string)=>Promise<number>
    getQuestionsByDiff:(diff:string)=>Promise<QuestionType[]>
    getAllQuestions:(page:string)=>Promise<{questions:QuestionType[],count:number}>
    disableQue:(qId:string)=>Promise<UpdateWriteOpResult>
    enableQue:(qId:string)=>Promise<UpdateWriteOpResult>
    questionEdit:(qId:string,question:string,answer:string,options:string[],difficulty:string,code?:string)=>Promise<UpdateWriteOpResult>
    getQuestion:(id:string)=>Promise<QuestionType|null>
}

export const QuestionRepositoryImpl = (questionModel:MongoDBQuestion):questionRepository=>{
    const createQuestion=async(question:string,answer:string,options:string[],difficulty:string,addedBy:string,role:string,code?:string)=>{
        const obj:QuestionType={
            question,
            answer,
            options,
            difficulty,
            addedBy:new mongoose.Types.ObjectId(addedBy),
            role,
            code
        }
        const result=await questionModel.create(obj)
        return result
    }

    const getQuestions = async(page:string,empId:string)=>{
        const skip=(parseInt(page)-1)*10
        const id=new mongoose.Types.ObjectId(empId)
        const questions=await questionModel.find({addedBy:id}).skip(skip).limit(10)
        return questions
    }
    const getCount=async(empId:string)=>{
        const id=new mongoose.Types.ObjectId(empId)
        const count=await questionModel.countDocuments({addedBy:id})
        return count

    }
    const getQuestionsByDiff=async(diff:string)=>{
        const questions=await questionModel.find({status:true,difficulty:diff})
        return questions
    }

    const getAllQuestions = async(page:string)=>{
        const skip=(parseInt(page)-1)*10
        const count=await questionModel.countDocuments()
        const questions=await questionModel.find().skip(skip).limit(10)
        return {questions,count}
    }
    const disableQue=async(qId:string)=>{
        const id=new mongoose.Types.ObjectId(qId)
        const update=await questionModel.updateOne({_id:id},{$set:{status:false}})
        return update
    }
    const enableQue=async(qId:string)=>{
        const id=new mongoose.Types.ObjectId(qId)
        const update=await questionModel.updateOne({_id:id},{$set:{status:true}})
        return update
    }

    const questionEdit=async(qId:string,question:string,answer:string,options:string[],difficulty:string,code?:string)=>{
        const data=await questionModel.updateOne({_id:new mongoose.Types.ObjectId(qId)},{$set:{question:question,answer:answer,options:options,difficulty:difficulty,code:code}})
        return data
    }

    const getQuestion=async(id:string)=>{
        const data=await questionModel.findOne({_id:new mongoose.Types.ObjectId(id)})
        return data
    }

    

    
    return {
        createQuestion,
        getQuestions,
        getCount,
        getQuestionsByDiff,
        getAllQuestions,
        disableQue,
        enableQue,
        questionEdit,
        getQuestion
        
    }
}