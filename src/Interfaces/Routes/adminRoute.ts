import { Router } from "express";
import { adminDashboardData, adminLogin, adminLogout } from "../controllers/adminController";
import { getAllEmployers, getNonPremiumUsers, getPremiumUsers } from "../controllers/userController";
import { adminAuth } from "../Middlewares/adminAuth";
import { updateEmpStatus } from "../controllers/employerController";
import { subscriptionHistoryForadmin } from "../controllers/subscription.Controller";
import { addQuestionCntrl, allQuestions, quesDisbleCntrl, quesEnableCntrl } from "../controllers/questionController";
import { disableQueStatus, enableQueStatus } from "../../app/usecases/questions/question";
const router=Router()

router.post('/login',adminLogin)
router.get('/non-premium-users',adminAuth,getNonPremiumUsers)
router.get('/premium-users',adminAuth,getPremiumUsers)
router.get('/employerlist',adminAuth,getAllEmployers)
router.post('/verify-emp',adminAuth,updateEmpStatus)
router.post('/logout',adminLogout)
router.get('/getadmindashboard',adminAuth,adminDashboardData)
router.get('/subscriptionhistory/:page',adminAuth,subscriptionHistoryForadmin)
router.get('/getallquestions/:page',adminAuth,allQuestions)
router.post('/add-question',adminAuth,addQuestionCntrl)
router.post('/enable-question',adminAuth,quesEnableCntrl)
router.post('/disable-question',adminAuth,quesDisbleCntrl)



export default router
