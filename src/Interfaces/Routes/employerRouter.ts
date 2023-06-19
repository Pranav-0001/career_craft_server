import { Router } from "express";
import { EmployerRegister, generateOtp } from "../controllers/employerController";
const router=Router()


router.post("/generate-otp",generateOtp)
router.post("/register",EmployerRegister)


export default router
