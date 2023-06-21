import { Request,Response } from "express";
import {userModel} from '../../infra/Database/userModel'
import { UserRepositoryImpl } from "../../infra/repositories/userRepository";
import { generateEmpSignupOtp } from "../../app/usecases/employer/generateOtpEmp";
import { signupEmp } from "../../app/usecases/employer/SignupEmp";
 
const db=userModel;
const userRepository = UserRepositoryImpl(db)




export const generateOtp =async(req:Request,res:Response)=>{
    const email: string= req.body.email
    console.log(email);
    
    const otp =  generateEmpSignupOtp(email)
    res.json(otp)
}

export const EmployerRegister = async (req:Request,res:Response)=>{
    const {firstname,lastname,username,email,company,location,password}=req.body
    const role='employer'
    try{
        const employer=await signupEmp(userRepository)(firstname,lastname,username,email,password,company,location,role)
        res.status(201).json({status:"success",employer})

    }catch(err){
        res.status(500).json({status:"server error"})
    }
    
}

export const postJob=async (req:Request,res:Response)=>{
    const {title,category,qualification,experience,deadline,salaryType,desc,jobType,rangeSalary,fixedSalary}=req.body
    try{
        // const result= await addJob()
    }catch(err){
        res.status(500).json({status:"server error"})
    }
}