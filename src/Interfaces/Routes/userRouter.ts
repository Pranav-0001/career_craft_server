import { Router } from "express";
import { auth, changePasswordCntrl, generateOtp, getDashboardData, getPremiumPageData, getUserDataCntrl, removeRefreshToken, updateBasicInformation, updateEducationInformation, updateEmployerProfile, updateProfInformation, updateProfileInformation, updateUserProfile, userLoginController, userRegister } from "../controllers/userController";
import {  bookmarkCntrl, getAllJobs, getDomains, getSavedJobsCntrl, getSingleJOb, removeBookmarkCntrl } from "../controllers/jobController";
import { applyJobCntrl, getAppliedByUserCntrl } from "../controllers/applicationController";
import { candidateAuth } from "../Middlewares/candidateAuth";
import { getExamcntrl, getRestrl, setAttended, submitExam } from "../controllers/ExamController";
import { addSubscriptionCntrl } from "../controllers/subscription.Controller";
import { CreateMockTestCntrl, getMockResCntrl, getMockTestCntrl, getMyMockTests, setMockAttendedCntrl, submitMockAnswerCntrl } from "../controllers/mockTestController";
import { addPubilcQuestion, ansPublicQuestion, answerlikeCntrl, editMyAns, getMyAns, getPublicAnswersById, getPublicQuestion, getPublicQuestions, getmypublicanswers, getmypublicquestions, questionLike, questionUnLike, undoAnslikeCntrl, updateQueCntrl } from "../controllers/publicQuestion";
import { empAuth } from "../Middlewares/empAuth";


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
router.get('/job/:id',candidateAuth,getSingleJOb)
router.get('/savejobs',candidateAuth,getSavedJobsCntrl)
router.post('/bookmarkjob',candidateAuth,bookmarkCntrl)
router.post('/removesaved',candidateAuth,removeBookmarkCntrl)
router.post('/applyjob',candidateAuth,applyJobCntrl)
router.post('/basic-update/:userId',candidateAuth,updateBasicInformation)
router.post('/profile-update/:userId',candidateAuth,updateProfileInformation)
router.put('/education-update/:userId',candidateAuth,updateEducationInformation)
router.put('/professional-update/:userId',candidateAuth,updateProfInformation)
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
router.put('/updatepublicquestion',candidateAuth,updateQueCntrl)
router.get('/dashboard/:id',candidateAuth,getDashboardData)
router.put(`/myprofile`,candidateAuth,updateUserProfile)
router.put('/updateEmployer',empAuth,updateEmployerProfile)
router.get('/getallmocktests',candidateAuth,getMyMockTests)
router.get('/get-results/:exam',candidateAuth,getMockResCntrl)
router.put('/changepassword',candidateAuth,changePasswordCntrl)

export default router