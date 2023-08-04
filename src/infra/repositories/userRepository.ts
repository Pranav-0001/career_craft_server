import mongoose, { UpdateWriteOpResult } from "mongoose";
import { User, socialType } from "../../domain/models/user";
import { MongoDBUser } from "../Database/userModel";
import bcrypt from 'bcrypt'

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
    updateUserProfile:(userId:string,username:string,profileImg:string,social?:socialType)=>Promise<UpdateWriteOpResult>
    getUsersCount:()=>Promise<{number:number,premium:number,emp:number}>
    updateEmpProfile:(empId:string,img:string,username:string,firstname:string,lastname:string,company:string,location:string,social:socialType)=>Promise<UpdateWriteOpResult>
    updatePassword:(userId:string,newPass:string)=>Promise<UpdateWriteOpResult>
    checkPass:(userId:string,password:string)=>Promise<boolean>
    blockUser:(userId:string)=>Promise<UpdateWriteOpResult>
    unBlockUser:(userId:string)=>Promise<UpdateWriteOpResult>
    getAllCandidates:(page:string)=>Promise<{users:User[],count:number}>
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

    const updateUserProfile=async(userId:string,username:string,profileImg:string,social?:socialType)=>{
        const id=new mongoose.Types.ObjectId(userId)
        const data=await userModel.updateOne({_id:id},{$set:{
            username:username,
            facebook:social?.facebook,
            instagram:social?.instagram,
            linkedIn:social?.linkedIn,
            gitHub:social?.gitHub,
            profileImg:profileImg
        }})
        return data
    }

    const getUsersCount=async()=>{
        const number=await userModel.countDocuments()
        const premium=await userModel.countDocuments({isPrime:true})
        const emp=await userModel.countDocuments({role:'employer'})
        
        return {number,premium,emp}
    }

    const updateEmpProfile=async(empId:string,img:string,username:string,firstname:string,lastname:string,company:string,location:string,social:socialType)=>{
        const id=new mongoose.Types.ObjectId(empId)
        const update=await userModel.updateOne({_id:id},{$set:{
            profileImg:img,
            firstname,
            lastname,
            username,
            company,
            location,
            facebook:social?.facebook,
            instagram:social?.instagram,
            linkedIn:social?.linkedIn

        }})
        return update
    }
    const checkPass=async(userId:string,password:string)=>{
        const user=await userModel.findOne({_id:new mongoose.Types.ObjectId(userId)})
        if(user){
            const status=bcrypt.compare(password,user.password)
            return status
        }
        return false
    }
    const updatePassword=async(userId:string,newPass:string)=>{
       const password=await bcrypt.hash(newPass,10)
       const update=await userModel.updateOne({_id:new mongoose.Types.ObjectId(userId)},{$set:{password:password}})
       return update
    }
    const blockUser=async(userId:string)=>{
        const update=await userModel.updateOne({_id:new mongoose.Types.ObjectId(userId)},{$set:{status:false}})
        return update
    }
    const unBlockUser=async(userId:string)=>{
        const update=await userModel.updateOne({_id:new mongoose.Types.ObjectId(userId)},{$set:{status:true}})
        return update
    }
    const getAllCandidates=async(page:string)=>{
        const skip=(parseInt(page)-1)*8
        const count=await userModel.countDocuments({role:'candidate'})
        const users=await userModel.find({role:'candidate'}).sort({isPrime:-1}).skip(skip).limit(8)
        return {users,count}
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
        updateExp,
        updateUserProfile,
        getUsersCount,
        updateEmpProfile,
        updatePassword,
        checkPass,
        blockUser,
        unBlockUser,
        getAllCandidates
    }
}