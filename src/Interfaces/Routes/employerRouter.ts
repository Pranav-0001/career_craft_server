import { Router } from "express";
import { EmployerRegister, generateOtp, getEmployerJobs, postJob, removeEmpRefreshToken } from "../controllers/employerController";
import { empAuth } from "../Middlewares/empAuth";
import { getApplicationByEmpIdCntrl } from "../controllers/applicationController";
import { acceptApplicationCntroller, fetchEmpChatsCntrlr } from "../controllers/chatController";
const router=Router()


router.post("/generate-otp",generateOtp)
router.post("/register",EmployerRegister)
router.post("/postjob",empAuth,postJob)
router.post("/logout",removeEmpRefreshToken)
router.get("/employer-jobs/:id",empAuth,getEmployerJobs)
router.get ('/getapplicationsbyemp',empAuth,getApplicationByEmpIdCntrl)
router.post('/accept-application',acceptApplicationCntroller)
router.get('/fetchChats/:empId',fetchEmpChatsCntrlr)



export default router
