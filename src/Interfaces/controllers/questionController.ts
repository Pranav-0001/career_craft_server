import { Request, Response } from "express"
import { addQuestion, disableQueStatus, enableQueStatus, getAllQuestions, getCount, getQuesrionById, getQuestions, updateQuestion } from "../../app/usecases/questions/question"
import { QuestionRepositoryImpl } from "../../infra/repositories/questionRepository"
import { QuestionModel } from "../../infra/Database/questionModel"


const QueRepository = QuestionRepositoryImpl(QuestionModel)


export const addQuestionCntrl = async (req: Request, res: Response) => {
    try {
        const { question, answer, difficulty, option1, option2, option3, code, addedBy, role } = req.body
        const addedQuestion = await addQuestion(QueRepository)(question, answer, option1, option2, option3, addedBy, role, difficulty, code)
        res.status(201).json({ addQuestion, status: true })
    } catch (error) {

    }


}

export const getAllQuestionsCntrl = async (req: Request, res: Response) => {
    try {
        const page = req.query.page as string
        const empId = req.query.empId as string
        const questions = await getQuestions(QueRepository)(page, empId)
        const countdocuments = await getCount(QueRepository)(empId)
        let pagecount: number[] = []
        for (let i = 1; i <= Math.ceil(countdocuments / 10); i++) {
            pagecount.push(i)
        }
        res.json({ questions, pagecount })
    } catch (error) {

    }


}

export const allQuestions = async (req: Request, res: Response) => {
    try {
        const { page } = req.params
        console.log(page);
        const { questions, count } = await getAllQuestions(QueRepository)(page)
        let pages = Math.ceil(count / 10)
        let pagination: number[] = []
        for (let i = 1; i <= pages; i++) {
            pagination.push(i)
        }
        res.json({ questions, pagination })
    } catch (error) {

    }


}

export const quesEnableCntrl = async (req: Request, res: Response) => {
    try {
        const { qId } = req.body
        const data = await enableQueStatus(QueRepository)(qId)
        res.json(data)
    } catch (error) {

    }
}

export const quesDisbleCntrl = async (req: Request, res: Response) => {
    try {
        const { qId } = req.body
        const data = await disableQueStatus(QueRepository)(qId)
        res.json(data)
    } catch (error) {

    }
}

export const  QuestionEditCntrl = async(req:Request,res:Response)=>{
    try {
       const {qId,question,answer,option1,option2,option3,difficulty,code}=req.body
       const data=await updateQuestion(QueRepository)(qId,question,answer,option1,option2,option3,difficulty,code)
       res.json({status:true,data}) 
    } catch (error) {
        
    }
}

export const getQuesrionByQId=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params
        const data=await getQuesrionById(QueRepository)(id)
        res.json({data})
    } catch (error) {
        
    }
}