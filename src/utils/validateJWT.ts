import jsonwebtoken, { JwtPayload } from 'jsonwebtoken'

export const validate = (token:string):boolean=>{
    try{
    let data=jsonwebtoken.verify(token,'KEY') as JwtPayload;
    if (data.exp) {
        const currentTimestamp = Math.floor(Date.now() / 1000);
  
        if (currentTimestamp > data.exp) {
          console.log('Token has expired.');
          
          return false;
        }
    }
    console.log(data);
    return true
    
    }catch(err){
        console.log(err);
        return false;
    }
} 
export const validateRefresh = (token:string):boolean=>{
    try{
    let data=jsonwebtoken.verify(token,'refresh') as JwtPayload;
    if (data.exp) {
        const currentTimestamp = Math.floor(Date.now() / 1000);
  
        if (currentTimestamp > data.exp) {
          console.log('Token has expired.');
          
          return false;
        }
    }
    
    return true
    
    }catch(err){
        console.log(err);
        return false;
    }
} 