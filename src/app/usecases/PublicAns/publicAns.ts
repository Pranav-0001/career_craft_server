import { publicAnsRepository } from "../../../infra/repositories/PublicAnsRepository"



export const ansPublic=(publicAnsRepository:publicAnsRepository)=>async(Qid:string,answer:string,addedBy:string,code?:string)=>{
    const data=await publicAnsRepository.create(Qid,answer,addedBy,code)
    return data
}

export const GetmyAns=(publicAnsRepository:publicAnsRepository)=>async(qId:string,userId:string)=>{
    const data=await publicAnsRepository.getMyAns(qId,userId)
    return data
}

export const updateMyans=(publicAnsRepository:publicAnsRepository)=>async(ansId:string,answer:string,code?:string)=>{
    const data=await publicAnsRepository.updateMyans(ansId,answer,code)
    return data
}

export const getAnsByQid=(publicAnsRepository:publicAnsRepository)=>async(qId:string)=>{
    const data=await publicAnsRepository.getAnsByQid(qId)
    return data
}

export const likeAnswer=(publicAnsRepository:publicAnsRepository)=>async(ansId:string,userId:string)=>{
    const data=await publicAnsRepository.likeAnswer(ansId,userId)
    return data
}

export const undolikeAnswer=(publicAnsRepository:publicAnsRepository)=>async(ansId:string,userId:string)=>{
    const data=await publicAnsRepository.undoLike(ansId,userId)
    return data
}

export const getAnsByUser=(publicAnsRepository:publicAnsRepository)=>async(userId:string)=>{
    const data=await publicAnsRepository.getANswerByUser(userId)
    return data
}

export const getMyLAS=(publicAnsRepository:publicAnsRepository)=>async(userId:string)=>{
    const data=await publicAnsRepository.getLASpoint(userId)
    return data
}