import { Router } from "express";
import { userLoginController, userRegister } from "../controllers/userController";

const router=Router()

router.get('/',(req,res)=>{
    console.log("working");
    res.json({status:'done'})
    
}) 

router.post('/login' , userLoginController )
router.post('/register',userRegister)


export default router