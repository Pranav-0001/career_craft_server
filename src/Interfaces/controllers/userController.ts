import { Request,Response } from "express";
import {userModel} from '../../infra/Database/userModel'
import { loginUser } from "../../app/usecases/user/loginUser";
import { UserRepositoryImpl } from "../../infra/repositories/userRepository";
 
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
    
}