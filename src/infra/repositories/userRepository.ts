import { User } from "../../domain/models/user";
import { MongoDBUser } from "../Database/userModel";

export type userRepository={
    findByEmail:(email:string) => Promise<User | null>
}

export const UserRepositoryImpl = (userModel:MongoDBUser):userRepository=>{
    
    const findByEmail=async(email:string):Promise<User | null>=>{
        const user=await userModel.findOne({email});
        return user ? user.toObject() : null;
    }
    
    return {
        findByEmail 
    }
}