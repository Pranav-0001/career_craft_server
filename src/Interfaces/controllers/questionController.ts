import { Request,Response } from "express"
import { addQuestion, getCount, getQuestions } from "../../app/usecases/questions/question"
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