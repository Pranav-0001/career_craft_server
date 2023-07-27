import { Request,Response } from "express";
import { addAnsUserId, askPublic, getPQueById, getPQues } from "../../app/usecases/PublicQue";
import { publicQuestionRepositoryImpl } from "../../infra/repositories/PublicQueRepository";
import { PublicQueModel } from "../../infra/Database/PublicQuestionModel";
import { ansPublic } from "../../app/usecases/PublicAns/publicAns";
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