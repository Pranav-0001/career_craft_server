import { UpdateWriteOpResult } from "mongoose";
import { User } from "../../domain/models/user";
import { MongoDBUser } from "../Database/userModel";

export type userRepository={
    findByEmail:(email:string) => Promise<User | null>;
    create:(user:User)=>Promise<User>
    getNonPremiumUser:()=>Promise<User[]>
    getPremiumUser:()=>Promise<User[]>
    getEmployers:()=>Promise<User[]>
    findAndUpdate:(empId:string)=>Promise<any>
    updateBasicInfo:(firstname:string,lastname:string,phone:string,qualification:string,objective:string,about:string,imageURL:string,userId:string)=>Promise<UpdateWriteOpResult>

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

    const updateBasicInfo=async(firstname:string,lastname:string,phone:string,qualification:string,objective:string,about:string,imageURL:string,userId:string):Promise<UpdateWriteOpResult>=>{
        
        const basicInfo={
            firstname,
            lastname,
            phone,
            qualification,
            objective,
            about,
            imageURL
        }

        const result=await userModel.updateOne({_id:userId},{$set:{basic:basicInfo}})
        return result
    }

    
    return {
        findByEmail ,
        create,
        getNonPremiumUser,
        getPremiumUser,
        getEmployers,
        findAndUpdate,
        updateBasicInfo
    }
}