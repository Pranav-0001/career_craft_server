import { Request, Response } from "express"
import { applyJob } from "../../app/usecases/user/jobApplication";
import { applicationRepositoryEmpl } from "../../infra/repositories/applicationRepository";
import { jobApplyModel } from "../../infra/Database/applyModel";
import { getUserInfo } from "../../app/usecases/user/updateUser";
import { UserRepositoryImpl } from "../../infra/repositories/userRepository";
import { userModel } from "../../infra/Database/userModel";

const applyRepository = applicationRepositoryEmpl(jobApplyModel)
const userRepository = UserRepositoryImpl(userModel)

export const applyJobCntrl = async (req: Request, res: Response) => {
    const userId = req.body.userId as string
    const jobId = req.body.jobId as string
    const empId = req.body.empId as string
    const userdata = await getUserInfo(userRepository)(userId)
    console.log(userdata, 1);


    if (userdata?.basic && userdata.profile && userdata.education) {
        console.log({ jobId, empId, userId });
        const application = await applyJob(applyRepository)(jobId, empId, userId)
        res.status(201).json({ status: true, application })
    }else{
        res.json({status:false,Error:"Your profile information is not complete. Please update it to continue applying for jobs."})
    }





}