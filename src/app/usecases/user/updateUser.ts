import { UserRepositoryImpl, userRepository } from "../../../infra/repositories/userRepository";
import { User } from "../../../domain/models/user";

export const updateBasic=(userRepository:userRepository)=>async(firstname:string,lastname:string,phone:string,qualification:string,objective:string,about:string,imageURL:string,userId:string)=>{
    const updatedBasic=await userRepository.updateBasicInfo(firstname,lastname,phone,qualification,objective,about,imageURL,userId)
    return updatedBasic
}

export const updateProfile=(userRepository:userRepository)=>async(father:string,mother:string,dob:string,nationality:string,permanent:string,present:string,marital:string,gender:string,skills:string,projects:[],userId:string)=>{
    const updatedProfile=await userRepository.updateProfileInfo(father,mother,dob,nationality,permanent,present,marital,gender,skills,projects,userId)
    return updatedProfile
}

export const updateEducation=(userRepository:userRepository)=>async(education:string,result:string,institute:string,starting:string,ending:string,userId:string)=>{
    const updatedEdu=await userRepository.updateEducationInfo(education,result,institute,starting,ending,userId)

    return updatedEdu
}

export const updateProfessional=(userRepository:userRepository)=>async(company:string,designation:string,experience:string,userId:string)=>{
    const updateProf=await userRepository.updateProfessionalInfo(company,designation,experience,userId)
}

export const getUserInfo=(userRepository:userRepository)=>async(userId:string)=>{
    const userInfo=await userRepository.getUserInformation(userId)
    return userInfo
}