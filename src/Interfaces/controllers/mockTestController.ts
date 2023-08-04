import { Request,Response } from "express"
import { getQuestionsByDiff } from "../../app/usecases/questions/question"
import { QuestionRepositoryImpl } from "../../infra/repositories/questionRepository"
import { QuestionModel } from "../../infra/Database/questionModel"
import { QuestionType } from "../../domain/models/question"
import { generateMockTest, getMockExamById, getMockLastExamByUserId, getMockTestByUserId, updateAnswer, updateAttended } from "../../app/usecases/exam/MockTest"
import { MockExamRepositoryImpl } from "../../infra/repositories/mockExamRepository"
import { MockeTestModel } from "../../infra/Database/mockTestModel"
import { UserRepositoryImpl } from "../../infra/repositories/userRepository"
import { userModel } from "../../infra/Database/userModel"
import { updateUserPoint } from "../../app/usecases/user/updateUser"

const questionRepository=QuestionRepositoryImpl(QuestionModel)
const mockExamRepository=MockExamRepositoryImpl(MockeTestModel)
const userRepository = UserRepositoryImpl(userModel)


export const CreateMockTestCntrl=async(req:Request,res:Response)=>{
    try {
      const {candidateId}:{candidateId:string} = req.body
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

    const exam = await generateMockTest(mockExamRepository)(questions,candidateId)
    res.json(exam)  
    } catch (error) {
        
    }
    


}

export const getMockTestCntrl=async(req:Request,res:Response)=>{
    try {
      const {id} =req.params
     const examData=await getMockExamById(mockExamRepository)(id)
     res.json(examData)  
    } catch (error) {
        
    }
     

}
export const setMockAttendedCntrl=async(req:Request,res:Response)=>{
    try {
        const {exam} =req.body
        const status=await updateAttended(mockExamRepository)(exam)
        res.json(status)
    } catch (error) {
        
    }
}

export const submitMockAnswerCntrl=async(req:Request,res:Response)=>{
    try {
        const {answer,exam,userId} = req.body
   
    
    const updated= await updateAnswer(mockExamRepository)(answer,exam)
    if(updated){
        const mockTests=await getMockLastExamByUserId(mockExamRepository)(userId)
        const totalQue=mockTests.length*10
        const totalAns = mockTests.reduce((t,ele)=> ele.mark ? t+ele.mark :t+0,0)
        const per=(totalAns/totalQue)*100
        await updateUserPoint(userRepository)(userId,per)
    }
    res.json(updated)
    } catch (error) {
        
    }
      
}

export const getMyMockTests=async(req:Request,res:Response)=>{
    try {
        const page = req.query.page as string
        const userId = req.query.userId as string
        const {exams,count} = await getMockTestByUserId(mockExamRepository)(userId, page)
        const pages=Math.ceil(count/10)
        const pagination=[]
        for(let i=1;i<=pages;i++){
            pagination.push(i)
        }
        res.json({exams,pagination})
    } catch (error) {
        
    }
}

export const getMockResCntrl=async(req:Request,res:Response)=>{
    try {
        const {exam} =req.params
        const data=await getMockExamById(mockExamRepository)(exam)
        res.json(data)
    } catch (error) {
        
    }
}