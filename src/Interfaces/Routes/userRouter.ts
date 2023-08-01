import { Router } from "express";
import { auth, generateOtp, getDashboardData, getPremiumPageData, getUserDataCntrl, removeRefreshToken, updateBasicInformation, updateEducationInformation, updateProfInformation, updateProfileInformation, updateUserProfile, userLoginController, userRegister } from "../controllers/userController";
import {  bookmarkCntrl, getAllJobs, getDomains, getSavedJobsCntrl, getSingleJOb, removeBookmarkCntrl } from "../controllers/jobController";
import { applyJobCntrl, getAppliedByUserCntrl } from "../controllers/applicationController";
import { candidateAuth } from "../Middlewares/candidateAuth";
import { getExamcntrl, setAttended, submitExam } from "../controllers/ExamController";
import { addSubscriptionCntrl } from "../controllers/subscription.Controller";
import { CreateMockTestCntrl, getMockTestCntrl, setMockAttendedCntrl, submitMockAnswerCntrl } from "../controllers/mockTestController";
import { addPubilcQuestion, ansPublicQuestion, answerlikeCntrl, editMyAns, getMyAns, getPublicAnswersById, getPublicQuestion, getPublicQuestions, getmypublicanswers, getmypublicquestions, questionLike, questionUnLike, undoAnslikeCntrl, updateQueCntrl } from "../controllers/publicQuestion";

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
router.post('/addpublicquestion',addPubilcQuestion)
router.get('/getpublicquestions',getPublicQuestions)
router.get('/getPublicQuestion/:id',getPublicQuestion)
router.post('/postAnswerPublicQuestion/:id',ansPublicQuestion)
router.get('/getmyAnswer/:id',getMyAns)
router.put('/editmyanswer',editMyAns)
router.get('/getanswers/:id',getPublicAnswersById)
router.put('/likeanswer',answerlikeCntrl)
router.put('/unlikeanswer',undoAnslikeCntrl)
router.put('/likequestion',questionLike)
router.put('/unlikequestion',questionUnLike)
router.get('/getmypublicquestion/:id',getmypublicquestions)
router.get('/getmypublicanswer/:id',getmypublicanswers)
router.put('/updatepublicquestion',updateQueCntrl)
router.get('/dashboard/:id',getDashboardData)
router.put(`/myprofile`,updateUserProfile)

export default router