import mongoose, { UpdateWriteOpResult } from "mongoose";
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
    updateProfileInfo:(father:string,mother:string,dob:string,nationality:string,permanent:string,present:string,marital:string,gender:string,skills:string,projects:[],userId:string)=>Promise<UpdateWriteOpResult>
    updateEducationInfo:(education:string,result:string,institute:string,starting:string,ending:string,userId:string)=>Promise<UpdateWriteOpResult>
    updateProfessionalInfo:(company:string,designation:string,experience:string,userId:string)=>Promise<UpdateWriteOpResult>
    getUserInformation:(userId:string)=>Promise<User |null>
    updateSub:(userId:string)=>Promise<UpdateWriteOpResult>
    updatePoint:(userId:string,per:number)=>Promise<UpdateWriteOpResult>
    updateExp:(userId:string)=>Promise<UpdateWriteOpResult>
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
    const updateProfileInfo=async(father:string,mother:string,dob:string,nationality:string,permanent:string,present:string,marital:string,gender:string,skills:string,projects:[],userId:string)=>{
        const profileInfo={
            father,
            mother,
            dob,
            nationality,
            permanent,
            present,
            marital,
            gender,
            skills,
            projects
        }
        const result=await userModel.updateOne({_id:userId},{$set:{profile:profileInfo}})
        return result


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

    const updateEducationInfo=async(education:string,result:string,institute:string,starting:string,ending:string,userId:string):Promise<UpdateWriteOpResult>=>{
        const eduInfo={
            education,
            result,
            institute,
            starting,
            ending
        }
        const response=await userModel.updateOne({_id:userId},{$set:{education:eduInfo}})
        return response
    }

    const updateProfessionalInfo=async(company:string,designation:string,experience:string,userId:string):Promise<UpdateWriteOpResult>=>{
        const profInfo={
            company,
            designation,
            experience
        }
        const response=await userModel.updateOne({_id:userId},{$set:{professional:profInfo}})
        return response
    }

    const getUserInformation=async(userId:string)=>{
        const response=await userModel.findOne({_id:userId})
        return response
    }

    const updateSub=async(userId:string)=>{
        
        function formatDateToDdMmYyyy(date:Date) {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}-${month}-${year}`;
          }
          
          function getDateAfterDays(days:number) {
            const currentDate = new Date();
            const futureDate = new Date(currentDate);
            futureDate.setDate(futureDate.getDate() + days);
            return futureDate;
          }
        const id=new mongoose.Types.ObjectId(userId)
        const res=await userModel.updateOne({_id:id},{$set:{isPrime:true,subscribedDate:formatDateToDdMmYyyy(new Date()),subscriptionStatus:'subscribed',Expiry:formatDateToDdMmYyyy(getDateAfterDays(30)) }})
        return res
    }

    const updatePoint=async(user:string,per:number)=>{
        const id=new mongoose.Types.ObjectId(user)
        const userData=await userModel.updateOne({_id:id},{$set:{mockPer:per}})
        return userData
    }

    const updateExp=async(user:string)=>{
        const id=new mongoose.Types.ObjectId(user)
        const userData=await userModel.updateOne({_id:id},{$set:{subscriptionStatus:'Expired',isPrime:false}})
        return userData


    }
    
    return {
        findByEmail ,
        create,
        getNonPremiumUser,
        getPremiumUser,
        getEmployers,
        findAndUpdate,
        updateBasicInfo,
        updateProfileInfo,
        updateEducationInfo,
        updateProfessionalInfo,
        getUserInformation,
        updateSub,
        updatePoint,
        updateExp
    }
}