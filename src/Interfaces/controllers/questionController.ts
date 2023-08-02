import { Request,Response } from "express"
import { addQuestion, disableQueStatus, enableQueStatus, getAllQuestions, getCount, getQuestions } from "../../app/usecases/questions/question"
import { QuestionRepositoryImpl } from "../../infra/repositories/questionRepository"
import { QuestionModel } from "../../infra/Database/questionModel"


const QueRepository=QuestionRepositoryImpl(QuestionModel)


export const addQuestionCntrl=async(req:Request,res:Response)=>{
    const {question,answer,difficulty,option1,option2,option3,code,addedBy,role}=req.body
    const addedQuestion=await addQuestion(QueRepository)(question,answer,option1,option2,option3,addedBy,role,difficulty,code)
    res.status(201).json({addQuestion,status:true})
    
}

export const getAllQuestionsCntrl=async(req:Request,res:Response)=>{
    const page=req.query.page as string
    const empId=req.query.empId as string
    const questions=await getQuestions(QueRepository)(page,empId)
    const countdocuments=await getCount(QueRepository)(empId)
    let pagecount:number[] = []
        for(let i=1;i<=Math.ceil(countdocuments/10);i++){ 
            pagecount.push(i)
        }
    res.json({questions,pagecount})
    
}

export const allQuestions=async(req:Request,res:Response)=>{
    const {page}=req.params
    console.log(page);
    
    const {questions,count} = await getAllQuestions(QueRepository)(page)
    let pages=Math.ceil(count/10)
    let pagination:number[]=[]
    for(let i=1;i<=pages;i++){
        pagination.push(i)
    }
    res.json({questions,pagination})

}

export const quesEnableCntrl=async(req:Request,res:Response)=>{
    const {qId}=req.body
    const data=await enableQueStatus(QueRepository)(qId)
    res.json(data)
}

export const quesDisbleCntrl=async(req:Request,res:Response)=>{
    const {qId}=req.body
    const data=await disableQueStatus(QueRepository)(qId)
    res.json(data)
}