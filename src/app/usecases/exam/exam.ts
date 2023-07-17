import mongoose from "mongoose";
import { QuestionType } from "../../../domain/models/question";
import { examModel } from "../../../infra/Database/examModel";
import { examRepository } from "../../../infra/repositories/ExamRepository";


export const generateTest=(examRepository:examRepository)=>async(questions:QuestionType[],candidate:string,employer:string)=>{
    const exam= await examRepository.createExam(questions,candidate,employer)
    return exam
}
export const getExamById=(examRepository:examRepository)=>async(examId:string)=>{
    const exam=await examRepository.getExam(examId)
    return exam
}

export const setExamAttended=(examRepository:examRepository)=>async(examId:string,time:string)=>{
    
    const exam=await examRepository.setAttended(examId,time)

}

export const submitAnswer=(examRepository:examRepository)=>async(answer:{ queId?: string, userAns?: string }[],exam:string)=>{
    const answers=answer.map((obj)=> {return {...obj,queId:new mongoose.Types.ObjectId(obj.queId)}})
    const res=await examRepository.setAnswer(answers,exam)
    return res
}