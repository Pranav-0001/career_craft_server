import { Router } from "express";
import { userLoginController } from "../controllers/userController";

const router=Router()

router.get('/',(req,res)=>{
    console.log("working");
    res.json({status:'done'})
    
}) 

router.post('/login' , userLoginController )
router.post('/candidate/login',)


export default router