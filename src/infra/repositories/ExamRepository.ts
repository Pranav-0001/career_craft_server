import { MongoDBExam } from "../Database/examModel";
import { examType } from "../../domain/models/exam";
import { QuestionType } from "../../domain/models/question";
import mongoose, { UpdateWriteOpResult } from "mongoose";


export type examRepository={
    createExam:(quesions:QuestionType[],candidate:string,employer:string)=>Promise<examType>
    getExam:(id:string)=>Promise<examType | null>
    setAttended:(id:string,time:string)=>Promise<UpdateWriteOpResult>
    setAnswer:(answers:{ queId?: mongoose.Types.ObjectId, userAns?: string }[],examId:string,mark:number)=>Promise<UpdateWriteOpResult>
}

export const ExamRepositoryImpl = (examModel:MongoDBExam):examRepository=>{
    const createExam=async(questions:QuestionType[],candidate:string,employer:string):Promise<examType>=>{
        const exam:examType={
            questions,
            candidate:new mongoose.Types.ObjectId(candidate),
            employer:new mongoose.Types.ObjectId(employer) ,
        }  
        const createedExam= await examModel.create(exam)
        return createedExam
    }

    const getExam=async(id:string):Promise<examType |null>=>{
        
        const examId=new mongoose.Types.ObjectId(id)
        const exam= await examModel.findOne({_id:examId})
        return exam
    }
    const setAttended=async(id:string,time:string):Promise<UpdateWriteOpResult>=>{
        const res=await examModel.updateOne({_id:new mongoose.Types.ObjectId(id)},{$set:{attended:true,startedAt:time}})
        return res
    }
    const setAnswer=async(answers:{ queId?: mongoose.Types.ObjectId, userAns?: string }[],examId:string,mark:number):Promise<UpdateWriteOpResult>=>{
        let id=new mongoose.Types.ObjectId(examId)
        const res= await examModel.updateOne({_id:id},{$set:{answers:answers,mark}})
        return res
    }
    

    return {
        createExam,
        getExam,
        setAttended,
        setAnswer
    }
}
