import { userRepository } from "../../../infra/repositories/userRepository";
import { User } from "../../../domain/models/user";

export const updateBasic=(userRepository:userRepository)=>async(firstname:string,lastname:string,phone:string,qualification:string,objective:string,about:string,imageURL:string,userId:string)=>{
    const updatedBasic=await userRepository.updateBasicInfo(firstname,lastname,phone,qualification,objective,about,imageURL,userId)
    return updatedBasic
}