import { Request,Response } from "express";
import {userModel} from '../../infra/Database/userModel'
import { loginUser } from "../../app/usecases/user/loginUser";
import { UserRepositoryImpl } from "../../infra/repositories/userRepository";
import { signupUser } from "../../app/usecases/user/SignupUser";
import { generateSignupOtp } from "../../app/usecases/user/generateOtp";
import jsonwebtoken, { JwtPayload }  from 'jsonwebtoken'
import { validate, validateRefresh } from "../../utils/validateJWT";
 
const db=userModel;
const userRepository = UserRepositoryImpl(db)

export const userLoginController = async (req:Request, res:Response) => {
    const {email,password}=req.body
    
    
    try{
        let user=await loginUser(userRepository)(email,password);
        if(user==='email'){
            res.json({ message: "Invalid Email" });
        } else if(user==='password'){
            res.json({ message: "Invalid password" });
        }else if(user==="employer" || user==="candidate"){
             if(user==="employer"){
                res.json({message:`Verification Pending. You'll get an email when account is verified.`,notVerified:true})
             }else{
                res.json({message:`Account is banned by admin.`})
             }
        }
        else{
            const {_id,role} = JSON.parse(JSON.stringify(user))
            
            const accessToken=jsonwebtoken.sign({sub:{_id,role}},'KEY',{expiresIn:'3d'})
            const refreshToken=jsonwebtoken.sign({sub:{_id,role}},'refresh',{expiresIn:'100d'})
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
    const {firstname,lastname,username,email,password,isGoogle,profileImg}=req.body
    try{
        const user= await signupUser(userRepository)(firstname,lastname,username,email,password,isGoogle,profileImg)
        const {_id,role} = JSON.parse(JSON.stringify(user))

            const accessToken=jsonwebtoken.sign({sub:{_id,role}},'KEY',{expiresIn:'3d'})
            const refreshToken=jsonwebtoken.sign({sub:{_id,role}},'refresh',{expiresIn:'100d'})
            res.cookie('userJWT',refreshToken,{
                httpOnly:true,
                secure:true,
                sameSite:'none',
                maxAge: 100*24*60*60*1000
            })
        res.status(201).json({message:"Signup successful",user,accessToken})
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

export const removeRefreshToken=async(req:Request,res:Response)=>{
    res.clearCookie('userJWT')
    res.json({status:true})
}

export const auth=async (req:Request , res:Response)=>{
    const {token}= req.body
    let status=validate(token)
    if(status){
        res.json({status:true})
    }else{
       const refreshToken=req.cookies.userJWT
       const refreshStatus=validateRefresh(refreshToken)
       
       if(refreshStatus){
         const data=jsonwebtoken.verify(refreshToken,'refresh') as JwtPayload
         const accessToken=jsonwebtoken.sign({sub:data.sub},'KEY',{expiresIn:'3d'})
         res.json({status:true,accessToken})
       }else{
        res.clearCookie('userJWT')
        res.json({status:false})
       }      
    }
    
}

