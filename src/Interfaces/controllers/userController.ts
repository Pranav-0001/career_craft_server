import { Request,Response } from "express";
import {userModel} from '../../infra/Database/userModel'
import { loginUser } from "../../app/usecases/user/loginUser";
import { UserRepositoryImpl } from "../../infra/repositories/userRepository";
import { signupUser } from "../../app/usecases/user/SignupUser";
 
const db=userModel;
const userRepository = UserRepositoryImpl(db)

export const userLoginController = async (req:Request, res:Response) => {
    const {email,password}=req.body
    try{
        const user=await loginUser(userRepository)(email,password);
        if(user){
            res.status(200).json({ message: "Login successful", user });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
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