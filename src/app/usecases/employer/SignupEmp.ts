import { UserRepositoryImpl, userRepository} from "../../../infra/repositories/userRepository";
import { User } from "../../../domain/models/user";
import bcrypt,{} from 'bcrypt'

export const signupEmp = (userRepository:userRepository)=>async (firstname:string,lastname:string,username:string,email:string,password:string,company:string,location:string,role:string):Promise<User>=>{
    

    password=await bcrypt.hash(password,10)
    const newEmp:User={
        email,
        firstname,
        lastname,
        username,
        password,
        company,
        location,
        role,
        status:false  
    } 

    const createdUser = await userRepository.create(newEmp)
    return createdUser
}

export const verifyRmployer=(userrepository:userRepository)=>async(empId:string)=>{
    const response=await userrepository.findAndUpdate(empId)
    return response
}

export const getCandidates=(UserRepository:userRepository)=>async(page:string)=>{
    const resoponse=await UserRepository.getAllCandidates(page)
    return resoponse
}