import { userRepository } from "../../../infra/repositories/userRepository";
import { User } from "../../../domain/models/user";

export const signupUser = (userRepository:userRepository)=>async (firstname:string,lastname:string,username:string,email:string,password:string):Promise<User>=>{
    
    console.log();
    
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