import { Router } from "express";
import { adminLogin, adminLogout } from "../controllers/adminController";
import { getAllEmployers, getNonPremiumUsers, getPremiumUsers } from "../controllers/userController";
import { adminAuth } from "../Middlewares/adminAuth";
import { updateEmpStatus } from "../controllers/employerController";
const router=Router()

router.post('/login',adminLogin)
router.get('/non-premium-users',adminAuth,getNonPremiumUsers)
router.get('/premium-users',adminAuth,getPremiumUsers)
router.get('/employerlist',adminAuth,getAllEmployers)
router.post('/verify-emp',adminAuth,updateEmpStatus)
router.post('/logout',adminLogout)


export default router
