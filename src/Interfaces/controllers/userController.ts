import { Request,Response } from "express";
import {userModel} from '../../infra/Database/userModel'
import { loginUser } from "../../app/usecases/user/loginUser";
import { UserRepositoryImpl } from "../../infra/repositories/userRepository";
import { signupUser } from "../../app/usecases/user/SignupUser";
import { generateSignupOtp } from "../../app/usecases/user/generateOtp";
import jsonwebtoken  from 'jsonwebtoken'
 
const db=userModel;
const userRepository = UserRepositoryImpl(db)

export const userLoginController = async (req:Request, res:Response) => {
    const {email,password}=req.body
    console.log(req.cookies);
    
    try{
        let user=await loginUser(userRepository)(email,password);
        if(user==='email'){
            res.json({ message: "Invalid Email" });
        } else if(user==='password'){
            res.json({ message: "Invalid password" });
        }else{
            const {_id} = JSON.parse(JSON.stringify(user))
            
            const accessToken=jsonwebtoken.sign({sub:_id},'KEY',{expiresIn:'3d'})
            const refreshToken=jsonwebtoken.sign({sub:_id},'refresh',{expiresIn:'100d'})
            res.cookie('userJWT',refreshToken,{
                httpOnly:true,
                secure:true,
                sameSite:'none',
                maxAge: 100*24*60*60*1000
            })
            res.status(200).json({ message: "Login successful", user ,accessToken});
        }

    }catch(err){
        res.status(500).json({message:"Internal server error"}) 
    }
}

export const userRegister = async (req:Request,res:Response)=>{
    const {firstname,lastname,username,email,password}=req.body
    try{
        const user= await signupUser(userRepository)(firstname,lastname,username,email,password)
        res.status(201).json({message:"Signup successful",user})
    }catch(err){
        console.log(JSON.parse(JSON.stringify(err)).code); 
        if(JSON.parse(JSON.stringify(err)).code==11000){
            res.status(403).json({message:"Email already exist"}) 
        }else{
            res.status(500).json({message:"Internal server error"}) 
        }
                
    }
}

export const generateOtp =async(req:Request,res:Response)=>{
    const email: string= req.body.email
    const otp =  generateSignupOtp(email)
    res.json(otp)
}