import { Router } from "express";
import { EmployerRegister, generateOtp, getEmployerJobs, postJob, removeEmpRefreshToken } from "../controllers/employerController";
import { empAuth } from "../Middlewares/empAuth";
import { getApplicationByEmpIdCntrl } from "../controllers/applicationController";
const router=Router()


router.post("/generate-otp",generateOtp)
router.post("/register",EmployerRegister)
router.post("/postjob",empAuth,postJob)
router.post("/logout",removeEmpRefreshToken)
router.get("/employer-jobs/:id",empAuth,getEmployerJobs)
router.get ('/getapplicationsbyemp',getApplicationByEmpIdCntrl)



export default router
