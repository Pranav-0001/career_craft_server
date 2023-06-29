import { Request,Response } from "express"
import { loginAdmin } from "../../app/usecases/admin/loginAdmin"
import { AdminRepositoryImpl } from "../../infra/repositories/adminRespository"
import { adminModel } from "../../infra/Database/adminModel"
import jsonwebtoken from 'jsonwebtoken'

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
            const datas=JSON.parse(JSON.stringify(admin))
            
            const accessToken=jsonwebtoken.sign({sub:{role:'Admin',id:datas._id}},'KEY',{expiresIn:'3d'})
            const refreshToken=jsonwebtoken.sign({sub:{role:'Admin',id:datas._id}},'refresh',{expiresIn:'100d'})
            res.cookie('adminJWT',refreshToken,{
                httpOnly:true,
                secure:true,
                sameSite:'none',
                maxAge: 100*24*60*60*1000
            })
           res.json({admin,accessToken})
            
        }
    } catch (error) {
        
    }
    
}

