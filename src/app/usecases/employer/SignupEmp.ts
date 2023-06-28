import { userRepository} from "../../../infra/repositories/userRepository";
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