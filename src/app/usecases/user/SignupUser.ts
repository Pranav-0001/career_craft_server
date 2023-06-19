import { userRepository } from "../../../infra/repositories/userRepository";
import { User } from "../../../domain/models/user";
import bcrypt,{} from 'bcrypt'

export const signupUser = (userRepository:userRepository)=>async (firstname:string,lastname:string,username:string,email:string,password:string):Promise<User>=>{
    

    password=await bcrypt.hash(password,10)
    const newUser:User={
        email,
        firstname,
        lastname,
        username,
        password
    }

    const createdUser = await userRepository.create(newUser)
    return createdUser
}