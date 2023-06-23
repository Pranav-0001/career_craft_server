import { Request,Response ,NextFunction} from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { validateRefresh } from "../../utils/validateJWT";

interface decode {
    sub: any
    iat: number;
    exp: number;
  }


export const  empAuth=(req:Request,res:Response,next:NextFunction)=>{
    try{
        let token=req.headers.accesstoken
        let accKey:jwt.Secret =process.env.ACCESSTOKEN as jwt.Secret
        if(token) {
            token=token.toString()
            let decoded=jwt.verify(token,accKey) as decode
          const {role,_id}= decoded.sub
          if(role==='employer'){
            const currentTimestamp = Math.floor(Date.now() / 1000);
            const isTokenExpired = decoded.exp < currentTimestamp;
            if(isTokenExpired){
                const refresh=req.cookies.userJWT
                const status=validateRefresh(refresh)
                if(status){
                    let newAccessToken=jwt.sign({sub:{_id,role}},'KEY',{expiresIn:'3d'})
                    res.locals.newAccessToken=newAccessToken
                    next()
                }else{
                    res.clearCookie('userJWT')
                    res.json({message:'cookie cleared',logout:true})
                }
                
            }else{
                next()
            }
          }else{
            res.json({message:'Unauthorized'})
          }
        }else{
            const refresh=req.cookies.userJWT
            if(refresh){
                const status=validateRefresh(refresh)
                if(status){
                    const decoded = jwt.verify(refresh,'refresh') as decode
                    if(decoded.sub.role==='employer'){
                        const {_id,role}=decoded.sub
                        let newAccessToken=jwt.sign({sub:{_id,role}},'KEY',{expiresIn:'3d'})
                        res.locals.newAccessToken=newAccessToken
                        next()
                    }
                }else{
                    res.clearCookie('userJWT')
                    res.json({message:'Unauthorized'})
                }
            }else{
               res.json({message:'Unauthorized'}) 
            } 
        }
        
    }catch(err){
        console.log(err);
        
    }
}