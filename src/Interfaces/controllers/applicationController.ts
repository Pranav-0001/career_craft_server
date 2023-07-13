import { Request, Response } from "express"
import { applyJob, getApplicationByEmpId, getApplicationByUserId, getCountAppEmp } from "../../app/usecases/user/jobApplication";
import { applicationRepositoryEmpl } from "../../infra/repositories/applicationRepository";
import { jobApplyModel } from "../../infra/Database/applyModel";
import { getUserInfo } from "../../app/usecases/user/updateUser";
import { UserRepositoryImpl } from "../../infra/repositories/userRepository";
import { userModel } from "../../infra/Database/userModel";
import { jobModel } from "../../infra/Database/jobModel";
import { JobRepositoryImpl } from "../../infra/repositories/jobRepository";
import { addAppliedBy } from "../../app/usecases/user/getJobs";

const applyRepository = applicationRepositoryEmpl(jobApplyModel)
const userRepository = UserRepositoryImpl(userModel)
const jobRepository = JobRepositoryImpl(jobModel)


export const applyJobCntrl = async (req: Request, res: Response) => {
    const userId = req.body.userId as string
    const jobId = req.body.jobId as string
    const empId = req.body.empId as string
    const userdata = await getUserInfo(userRepository)(userId)
    console.log(userdata, 1);


    if (userdata?.basic && userdata.profile && userdata.education) {
        console.log({ jobId, empId, userId });
        const application = await applyJob(applyRepository)(jobId, empId, userId)
        if (application.status) {
            const updateJob = await addAppliedBy(jobRepository)(jobId, userId)
            console.log(updateJob);

        }
        res.status(201).json({ status: true, application })
    } else {
        res.json({ status: false, Error: "Your profile information is not complete. Please update it to continue applying for jobs." })
    }
}

export const getAppliedByUserCntrl = async (req: Request, res: Response) => {
    try {
        const userId: string = req.params.userId
        const applications = await getApplicationByUserId(applyRepository)(userId)

        res.status(201).json({ jobs: applications })
    } catch (error) {
        console.log(error);

    }



}

export const getApplicationByEmpIdCntrl = async (req: Request, res: Response) => {
    try {
        const empId = req.query.empId?.toString()
        const page = req.query.page?.toString()
        if (empId && page) {
            const applications = await getApplicationByEmpId(applyRepository)(empId, page)
            const count = await getCountAppEmp(applyRepository)(empId)
            let pagecount: number[] = []
            for (let i = 1; i <= Math.ceil(count / 10); i++) {
                pagecount.push(i)
            }
            res.status(201).json({ applications,pagecount })
        }

    } catch (error) {

    }
}