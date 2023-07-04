import { Router } from "express";
import { auth, generateOtp, removeRefreshToken, userLoginController, userRegister } from "../controllers/userController";
import { applyJobCntrl, bookmarkCntrl, getAllJobs, getDomains, getSavedJobsCntrl, getSingleJOb, removeBookmarkCntrl } from "../controllers/jobController";

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
router.get('/job/:id',getSingleJOb)
router.get('/savejobs',getSavedJobsCntrl)
router.post('/bookmarkjob',bookmarkCntrl)
router.post('/removesaved',removeBookmarkCntrl)
router.post('/applyjob',applyJobCntrl)

export default router