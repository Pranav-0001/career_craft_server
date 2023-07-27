import { publicAnsRepository } from "../../../infra/repositories/PublicAnsRepository"



export const ansPublic=(publicAnsRepository:publicAnsRepository)=>async(Qid:string,answer:string,addedBy:string,code?:string)=>{
    const data=await publicAnsRepository.create(Qid,answer,addedBy,code)
    return data
}