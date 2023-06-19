import { userRepository } from "../../../infra/repositories/userRepository";
import { User } from "../../../domain/models/user";
import bcrypt from 'bcrypt'

export const loginUser = (userRepository: userRepository)=>async (email :string ,password:string):Promise<User | string |null>=>{
    const user = await userRepository.findByEmail(email);
    
    if(user){
        const verified= await bcrypt.compare(password,user?.password)
        if(verified){

            console.log("success");
            return user
            
        }else{
            console.log("failes");
            return 'password'
        }
        
    }
    return 'email'
    
}