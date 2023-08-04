import { Request,Response } from "express";
import { UnlikeQuestionWithId, addAnsUserId, askPublic, getPQueById, getPQues, getQueByUser, likeQuestionWithId, updatePublicQuestion } from "../../app/usecases/PublicQue";
import { publicQuestionRepositoryImpl } from "../../infra/repositories/PublicQueRepository";
import { PublicQueModel } from "../../infra/Database/PublicQuestionModel";
import { GetmyAns, ansPublic, getAnsByQid, getAnsByUser, likeAnswer, undolikeAnswer, updateMyans } from "../../app/usecases/PublicAns/publicAns";
import { publicAnswerRepositoryImpl } from "../../infra/repositories/PublicAnsRepository";
import { PublicAnsModel } from "../../infra/Database/PublicAnswer";


const publicQuestionRepository=publicQuestionRepositoryImpl(PublicQueModel)
const publicAnsRepository=publicAnswerRepositoryImpl(PublicAnsModel)


export const addPubilcQuestion=async(req:Request,res:Response)=>{
    try {
        const {title,language,question,code,userId}=req.body
        const data=await askPublic(publicQuestionRepository)(title,question,userId,language,code)
        res.json(data)
    } catch (error) {
        console.log(error);
        
    }
    
}

export const getPublicQuestions=async(req:Request,res:Response)=>{
    try {
        const page = req.query.page as string;
        const filter = req.query.filter as string;
        
       console.log(page,filter);
       
        
        const {questions,count,languages}=await getPQues(publicQuestionRepository)(parseInt(page),filter)
        let pageArr:number[]=[]
        const pages=Math.ceil(count/6)
        for(let i=1;i<=pages;i++){
            pageArr.push(i)
        }
        res.json({questions,pageArr,languages})
        
    } catch (error) {
        
    }
}

export const getPublicQuestion=async(req:Request,res:Response)=>{
    try {
        const {id} =req.params
        const data=await getPQueById(publicQuestionRepository)(id)
        res.json(data)
    } catch (error) {
        
    }
}

export const ansPublicQuestion=async(req:Request,res:Response)=>{
    try {
        const {id} =req.params
        const {userId,answer,code}=req.body
        const ans=await ansPublic(publicAnsRepository)(id,answer,userId,code)
        if(ans){
            await addAnsUserId(publicQuestionRepository)(id,userId)
        }

    } catch (error) {
        
    }
}

export const getMyAns=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params
        const userId=req.query.userId as string
      
        
        
        const data=await GetmyAns(publicAnsRepository)(id,userId)
       
        res.json(data)
    } catch (error) {
        
    }
}

export const editMyAns=async(req:Request,res:Response)=>{
    try {
        const {ansId,answer,code}=req.body
        
        
        const data=await updateMyans(publicAnsRepository)(ansId,answer,code)
        res.json(data)
    } catch (error) {
        
    }
}

export const getPublicAnswersById=async(req:Request,res:Response)=>{
    try {
        const {id} =req.params
        const data=await getAnsByQid(publicAnsRepository)(id)
        res.json(data)
    } catch (error) {
        
    }
}

export const answerlikeCntrl=async(req:Request,res:Response)=>{
    try {
        const {ansId,userId}=req.body
        const data=await likeAnswer(publicAnsRepository)(ansId,userId)
        res.json(data)

    } catch (error) {
        
    }
}

export const undoAnslikeCntrl=async(req:Request,res:Response)=>{
    try {
        const {ansId,userId}=req.body
        const data=await undolikeAnswer(publicAnsRepository)(ansId,userId)
        res.json(data)

    } catch (error) {
        
    }
}

export const questionLike=async(req:Request,res:Response)=>{
    try {
        const {qId,userId}=req.body
        
        
        const data=await likeQuestionWithId(publicQuestionRepository)(qId,userId)
        res.json(data)
    } catch (error) {
         
    }
}

export const questionUnLike=async(req:Request,res:Response)=>{
    try {
        const {qId,userId}=req.body
        const data=await UnlikeQuestionWithId(publicQuestionRepository)(qId,userId)
        res.json(data)
    } catch (error) {
        
    }
}

export const getmypublicquestions=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params
        const questions=await getQueByUser(publicQuestionRepository)(id)
        res.json(questions)
    } catch (error) {
        
    }
}

export const getmypublicanswers=async(req:Request,res:Response)=>{
    try {
    const {id}=req.params
    const answers=await getAnsByUser(publicAnsRepository)(id)
    res.json(answers)
    } catch (error) {
        
    }
}

export const updateQueCntrl=async(req:Request,res:Response)=>{
    try {
        const {qId,title,language,question,code}=req.body
    
    
    const data=await updatePublicQuestion(publicQuestionRepository)(qId,title,language,question,code)
    res.json(data)
    } catch (error) {
        
    }
    
}