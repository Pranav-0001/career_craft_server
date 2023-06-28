import { Request,Response } from "express"
import { loginAdmin } from "../../app/usecases/admin/loginAdmin"
import { AdminRepositoryImpl } from "../../infra/repositories/adminRespository"
import { adminModel } from "../../infra/Database/adminModel"

const adminRepository=AdminRepositoryImpl(adminModel)

export const adminLogin=async(req:Request,res:Response)=>{
    const {email,password}=req.body
    try {
        const admin=await loginAdmin(adminRepository)(email,password)
        if(admin==="email"){
            res.json({email:"Invalid Email"})
            
        }else if(admin==="password"){
            res.json({email:"Invalid Password"})

            
        }else if(admin){
           res.json({admin})
            
        }
    } catch (error) {
        
    }
    
}