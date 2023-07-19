import { Request,Response } from "express"
import { getQuestionsByDiff } from "../../app/usecases/questions/question"
import { ExamRepositoryImpl } from "../../infra/repositories/ExamRepository"
import { examModel } from "../../infra/Database/examModel"
import { QuestionRepositoryImpl } from "../../infra/repositories/questionRepository"
import { QuestionModel } from "../../infra/Database/questionModel"
import { QuestionType } from "../../domain/models/question"
import { generateTest, getExamById, getResById, setExamAttended, submitAnswer } from "../../app/usecases/exam/exam"
import { examType } from "../../domain/models/exam"

const examRepository=ExamRepositoryImpl(examModel)
const questionRepository=QuestionRepositoryImpl(QuestionModel)

export const generateExam=async(req:Request,res:Response)=>{
    const {candidateId,empId}=req.body
    const easy=await getQuestionsByDiff(questionRepository)('Easy')
    const med=await getQuestionsByDiff(questionRepository)('Medium')
    const hard=await getQuestionsByDiff(questionRepository)('Hard')
    let questions:QuestionType[]=[]
    for (let i = 0; i < 3; i++) {
        let randomIndex = Math.floor(Math.random() * easy.length);
        questions.push(easy[randomIndex]);
        easy.splice(randomIndex, 1);
    }
    for (let i = 0; i < 3; i++) {
        let randomIndex = Math.floor(Math.random() * med.length);
        questions.push(med[randomIndex]);
        med.splice(randomIndex, 1);
    }
    for (let i = 0; i < 4; i++) {
        let randomIndex = Math.floor(Math.random() * hard.length);
        questions.push(hard[randomIndex]);
        hard.splice(randomIndex, 1);
    }
    const exam=await generateTest(examRepository)(questions,candidateId,empId)
    res.json({exam})
    

    
}

export const getExamcntrl=async(req:Request,res:Response)=>{

     const {exam}=req.params
     const examData=await getExamById(examRepository)(exam)
    
     
     res.json(examData)
}
export const getRestrl=async(req:Request,res:Response)=>{

    const {exam}=req.params
    const examData=await getResById(examRepository)(exam)
    
    
   
    
    if(examData) res.json(examData)
    else res.json(examData)
}

export const setAttended=async(req:Request,res:Response)=>{
    const {exam} =req.body
    const time=new Date().toLocaleTimeString()
    const result=await setExamAttended(examRepository)(exam,time)
    return result
    
}

export const submitExam=async(req:Request,res:Response)=>{
    const {answer,exam}=req.body
    console.log({answer,exam});
    
    
    const data=await submitAnswer(examRepository)(answer,exam)
    // console.log(data);
    
    res.json({data,status:true})
    
}