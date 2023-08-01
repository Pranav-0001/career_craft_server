import mongoose, { UpdateWriteOpResult } from "mongoose";
import { MongoDBQuestion } from "../Database/questionModel";
import { QuestionType } from "../../domain/models/question";


export type questionRepository={
    createQuestion:(question:string,answer:string,options:string[],difficulty:string,addedBy:string,role:string,code?:string)=>Promise<QuestionType>
    getQuestions:(page:string,empId:string)=>Promise<QuestionType[]>
    getCount:(empId:string)=>Promise<number>
    getQuestionsByDiff:(diff:string)=>Promise<QuestionType[]>
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
        const questions=await questionModel.find({difficulty:diff})
        return questions
    }

    
    return {
        createQuestion,
        getQuestions,
        getCount,
        getQuestionsByDiff
    }
}