import { Router } from "express";
import { auth, generateOtp, getPremiumPageData, getUserDataCntrl, removeRefreshToken, updateBasicInformation, updateEducationInformation, updateProfInformation, updateProfileInformation, userLoginController, userRegister } from "../controllers/userController";
import {  bookmarkCntrl, getAllJobs, getDomains, getSavedJobsCntrl, getSingleJOb, removeBookmarkCntrl } from "../controllers/jobController";
import { applyJobCntrl, getAppliedByUserCntrl } from "../controllers/applicationController";
import { candidateAuth } from "../Middlewares/candidateAuth";
import { getExamcntrl, setAttended, submitExam } from "../controllers/ExamController";
import { addSubscriptionCntrl } from "../controllers/subscription.Controller";
import { CreateMockTestCntrl, getMockTestCntrl, setMockAttendedCntrl, submitMockAnswerCntrl } from "../controllers/mockTestController";

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
router.get('/user-applied-jobs/:userId',candidateAuth,getAppliedByUserCntrl)
router.get('/get-exam/:exam',getExamcntrl)
router.post('/setattended',setAttended)
router.post('/submitexam',submitExam)
router.post('/add-subscription',addSubscriptionCntrl)
router.post('/create-exam',CreateMockTestCntrl)
router.get('/get-Mockexam/:id',getMockTestCntrl)
router.post('/setmockattended',setMockAttendedCntrl)
router.post('/submitmocktest',submitMockAnswerCntrl)
router.get('/premiumpage/:user',getPremiumPageData)

export default router