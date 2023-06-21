import { Router } from "express";
import { EmployerRegister, generateOtp } from "../controllers/employerController";
const router=Router()


router.post("/generate-otp",generateOtp)
router.post("/register",EmployerRegister)
router.post("/postjob",)


export default router
