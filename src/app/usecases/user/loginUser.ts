import { userRepository } from "../../../infra/repositories/userRepository";
import { User } from "../../../domain/models/user";

export const loginUser = (userRepository: userRepository)=>async (email :string ,password:string):Promise<User | null>=>{
    const user = await userRepository.findByEmail(email);
    if(user && user.password===password){
        return user
    }
    return null
}