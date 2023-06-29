import { User } from "../../domain/models/user";
import { MongoDBUser } from "../Database/userModel";

export type userRepository={
    findByEmail:(email:string) => Promise<User | null>;
    create:(user:User)=>Promise<User>
    getNonPremiumUser:()=>Promise<User[]>
    getPremiumUser:()=>Promise<User[]>
    getEmployers:()=>Promise<User[]>
    findAndUpdate:(empId:string)=>Promise<any>

}

export const UserRepositoryImpl = (userModel:MongoDBUser):userRepository=>{
    
    const findByEmail=async(email:string):Promise<User | null>=>{
        const user=await userModel.findOne({email});
        return user ? user.toObject() : null;
    }

    const create=async(user :User):Promise<User>=>{
        
        
        const createdUser=await userModel.create(user)
        console.log(createdUser);
        
        return createdUser.toObject()
    }

    const getNonPremiumUser=async():Promise<User[]>=>{
        const users=await userModel.find({role:"candidate",isPrime:false})
        return users
    }

    const getPremiumUser=async():Promise<User[]>=>{
        const users=await userModel.find({role:"candidate",isPrime:true})
        return users
    }

    const getEmployers=async():Promise<User[]>=>{
        const users=await userModel.find({role:"employer"})
        return users
    }

    const findAndUpdate=async(empId:string):Promise<any>=>{
        console.log("hrerer");
        
        const updated=await userModel.updateOne({_id:empId},{$set:{status:true}})
        return updated
        
    }

    
    return {
        findByEmail ,
        create,
        getNonPremiumUser,
        getPremiumUser,
        getEmployers,
        findAndUpdate
    }
}