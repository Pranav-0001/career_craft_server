import { Request,Response } from "express"
import {userModel} from '../../infra/Database/userModel'
import {jobModel} from '../../infra/Database/jobModel'
import { UserRepositoryImpl } from "../../infra/repositories/userRepository";
import { generateEmpSignupOtp } from "../../app/usecases/employer/generateOtpEmp";
import { signupEmp } from "../../app/usecases/employer/SignupEmp";
import { addJobEmp } from "../../app/usecases/employer/postjob";
import { JobRepositoryImpl } from "../../infra/repositories/jobRepository";
import {getEmpJobs} from '../../app/usecases/employer/getEmpJobs'
import jsonwebtoken from 'jsonwebtoken'
import { Job } from "../../domain/models/job";
 
const db=userModel;
const empDB=jobModel
const userRepository = UserRepositoryImpl(db)
const jobRepository=JobRepositoryImpl(empDB)




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
        // const {_id} = JSON.parse(JSON.stringify(employer)) 
        // const accessToken=jsonwebtoken.sign({sub:{_id,role}},'KEY',{expiresIn:'3d'})
        //     const refreshToken=jsonwebtoken.sign({sub:{_id,role}},'refresh',{expiresIn:'100d'})
        //     res.cookie('userJWT',refreshToken,{
        //         httpOnly:true,
        //         secure:true,
        //         sameSite:'none',
        //         maxAge: 100*24*60*60*1000
        //     })
        res.status(201).json({status:"success",employer})

    }catch(err){
        res.status(500).json({status:"server error"})
    }
    
}

export const postJob=async (req:Request,res:Response)=>{
    const {title,category,qualification,experience,deadline,salaryType,desc,jobType,salaryFrom,salaryTo,fixedSalary,EmployerId}=req.body as Job
    try{
        const result=await addJobEmp(jobRepository)(title,category,qualification,experience,deadline,salaryType,desc,jobType,fixedSalary,EmployerId,salaryFrom,salaryTo)
        res.json({status:true,jobData:result})
    }catch(err){
        res.status(500).json({status:"server error"})
    }
}

export const removeEmpRefreshToken=async(req:Request,res:Response)=>{
    res.clearCookie('userJWT')
    res.json({status:true})
}

export const getEmployerJobs=async (req:Request,res:Response)=>{
    const {id}=req.params
    try{
        const jobs=await getEmpJobs(jobRepository)(id)
        const newAccessToken=res.locals.newAccessToken
        if (newAccessToken) res.json({jobs,newAccessToken})
        else res.json({jobs})

    }catch(err){
        res.status(500).json({message:"Internal Server Error"})
    }
}