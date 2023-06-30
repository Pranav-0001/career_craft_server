import { Request,Response ,NextFunction} from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { validateRefresh } from "../../utils/validateJWT";

interface decode {
    sub: any
    iat: number;
    exp: number;
  }

export const adminAuth=(req:Request,res:Response,next:NextFunction)=>{
    try{
        let token = req.headers?.adminaccesstoken
        let accKey:jwt.Secret =process.env.ACCESSTOKEN as jwt.Secret 
        
        if(token){
          
            
            token=token.toString()
            let decoded=jwt.verify(token,accKey) as decode
            const {id,role} = decoded.sub
            if(role==='Admin'){
                const currentTimestamp = Math.floor(Date.now() / 1000);
                const isTokenExpired = decoded.exp < currentTimestamp;
                if(isTokenExpired){
                    const refresh=req.cookies.adminJWT
                    const status=validateRefresh(refresh)
                    if(status){
                        let newAccessToken=jwt.sign({sub:{id,role}},'KEY',{expiresIn:'3d'})
                        res.locals.newadminaccesstoken=newAccessToken
                        next()
                    }else{
                        res.clearCookie('adminJWT')
                        res.json({message:'cookie cleared',logout:true})
                    }
                    
                }else{
                    next()
                }
            }else{
                res.json({message:"unauthorized"})
            }
        }else{
            const refresh=req.cookies.adminJWT
            const status=validateRefresh(refresh)
            
            
            if(status){
                const decoded = jwt.verify(refresh,'refresh') as decode
                const {id,role}=decoded.sub
                let newAccessToken=jwt.sign({sub:{id,role}},'KEY',{expiresIn:'3d'})
                res.locals.newadminaccesstoken=newAccessToken
                next()
            }else{
                res.clearCookie('adminJWT')
                res.json({message:'cookie cleared',logout:true})
            }
        }
    }catch(err){
        console.log(err);
    }
} 