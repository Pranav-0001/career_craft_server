import { Router } from "express";
import { EmployerRegister, editJob, generateOtp, getEmployerJobs, postJob, removeEmpRefreshToken } from "../controllers/employerController";
import { empAuth } from "../Middlewares/empAuth";
import { getApplicationByEmpIdCntrl } from "../controllers/applicationController";
import { acceptApplicationCntroller, fetchEmpChatsCntrlr } from "../controllers/chatController";
import { addQuestionCntrl, getAllQuestionsCntrl, quesDisbleCntrl, quesEnableCntrl } from "../controllers/questionController";
import { generateExam, getExamcntrl, getRestrl } from "../controllers/ExamController";
import { getSingleJOb } from "../controllers/jobController";
import { disableQueStatus, enableQueStatus } from "../../app/usecases/questions/question";
const router=Router()


router.post("/generate-otp",generateOtp)
router.post("/register",EmployerRegister)
router.post("/postjob",empAuth,postJob)
router.put("/editjob/:job",empAuth,editJob)
router.post("/logout",removeEmpRefreshToken)
router.get("/employer-jobs/:id",empAuth,getEmployerJobs)
router.get ('/getapplicationsbyemp',empAuth,getApplicationByEmpIdCntrl)
router.post('/accept-application',acceptApplicationCntroller)
router.get('/fetchChats/:empId',fetchEmpChatsCntrlr)
router.post('/add-question',addQuestionCntrl)
router.get('/getquestions',getAllQuestionsCntrl)
router.post('/create-exam',generateExam)
router.get('/job/:id',getSingleJOb)
router.get('/get-results/:exam',getRestrl)
router.post('/enable-question',empAuth,quesEnableCntrl)
router.post('/disable-question',empAuth,quesDisbleCntrl)




export default router
