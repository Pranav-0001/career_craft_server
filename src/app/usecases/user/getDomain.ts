
import { jobRepository } from "../../../infra/repositories/jobRepository"




export const getDomain=(jobRepository:jobRepository)=>async():Promise<string[]>=>{
    
    const domains= await jobRepository.getDomains()
    return domains
}