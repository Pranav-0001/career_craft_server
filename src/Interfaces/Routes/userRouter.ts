import { Router } from "express";
import { auth, generateOtp, getUserDataCntrl, removeRefreshToken, updateBasicInformation, updateEducationInformation, updateProfInformation, updateProfileInformation, userLoginController, userRegister } from "../controllers/userController";
import {  bookmarkCntrl, getAllJobs, getDomains, getSavedJobsCntrl, getSingleJOb, removeBookmarkCntrl } from "../controllers/jobController";
import { applyJobCntrl } from "../controllers/applicationController";

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
router.post('/basic-update/:userId',updateBasicInformation)
router.post('/profile-update/:userId',updateProfileInformation)
router.put('/education-update/:userId',updateEducationInformation)
router.put('/professional-update/:userId',updateProfInformation)
router.get('/getuserdata/:userId',getUserDataCntrl)

export default router