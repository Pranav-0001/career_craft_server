import { Router } from "express";
import { EmployerRegister, generateOtp, getEmployerJobs, postJob, removeEmpRefreshToken } from "../controllers/employerController";
const router=Router()


router.post("/generate-otp",generateOtp)
router.post("/register",EmployerRegister)
router.post("/postjob",postJob)
router.post("/logout",removeEmpRefreshToken)
router.get("/employer-jobs/:id",getEmployerJobs)



export default router
