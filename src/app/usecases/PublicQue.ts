import { publicQuestionRepository, publicQuestionRepositoryImpl } from "../../infra/repositories/PublicQueRepository"


export const askPublic=(publicQuestionRepository:publicQuestionRepository)=>async(title:string,question:string,addedBy:string,language:string,code?:string)=>{
    const data=await publicQuestionRepository.createQuestion(title,question,addedBy,language,code)
    return data
}

export const getPQues=(publicQuestionRepository:publicQuestionRepository)=>async(page:number,filter?:string)=>{
    const data=await publicQuestionRepository.getPublicQuestions(page,filter)
    return data
}

export const getPQueById=(publicQuestionRepository:publicQuestionRepository)=>async(id:string)=>{
    const data=await publicQuestionRepository.getPublicQuestionById(id)
    return data
}

export const addAnsUserId=(publicQuestionRepository:publicQuestionRepository)=>async(qId:string,userId:string)=>{
    const data=await publicQuestionRepository.updateAnsArray(qId,userId)
    return data
}

export const likeQuestionWithId=(publicQuestionRepository:publicQuestionRepository)=>async(qId:string,userId:string)=>{
    const data=await publicQuestionRepository.likeQuestion(qId,userId)
    return data
}

export const UnlikeQuestionWithId=(publicQuestionRepository:publicQuestionRepository)=>async(qId:string,userId:string)=>{
    const data=await publicQuestionRepository.UnlikeQuestion(qId,userId)
    return data
}

export const getQueByUser=(publicQuestionRepository:publicQuestionRepository)=>async(userId:string)=>{
    const data=await publicQuestionRepository.getQuestionByUser(userId)
    return data
}

export const updatePublicQuestion=(publicQuestionRepository:publicQuestionRepository)=>async(qId:string,title:string,language:string,question:string,code?:string)=>{
    const data=await publicQuestionRepository.updateQue(qId,title,language,question,code)
    return data
}
