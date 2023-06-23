import { Router } from "express";
import { auth, generateOtp, removeRefreshToken, userLoginController, userRegister } from "../controllers/userController";
import { getAllJobs, getDomains } from "../controllers/jobController";

const router=Router()

router.get('/',(req,res)=>{
    console.log("working");
    res.json({status:'done'})
    
}) 

router.post('/',auth)
router.post('/login' , userLoginController )
router.post('/register',userRegister)
router.post('/generate-otp',generateOtp)
router.post('/logout',removeRefreshToken)
router.get('/alljobs',getAllJobs)
router.get('/domains',getDomains)


export default router