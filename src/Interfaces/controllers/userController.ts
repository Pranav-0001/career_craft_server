import { Request, Response } from "express";
import { userModel } from '../../infra/Database/userModel'
import { getUserbyEmail, loginUser } from "../../app/usecases/user/loginUser";
import { UserRepositoryImpl } from "../../infra/repositories/userRepository";
import { signupUser } from "../../app/usecases/user/SignupUser";
import { generateForgotPasswordOtp, generateSignupOtp } from "../../app/usecases/user/generateOtp";
import jsonwebtoken, { JwtPayload } from 'jsonwebtoken'
import { validate, validateRefresh } from "../../utils/validateJWT";
import { Employers, Nonpremium, Premium } from "../../app/usecases/admin/getUsers";
import { blockUser, checkPassWord, expiredSubs, getUserInfo, updateBasic, updateEducation, updateEmployer, updateMyProfile, updatePassWord, updatePassWordByEmail, updateProfessional, updateProfile } from "../../app/usecases/user/updateUser";
import { getMockExamById, getMockLastExamByUserId } from "../../app/usecases/exam/MockTest";
import { MockExamRepositoryImpl } from "../../infra/repositories/mockExamRepository";
import { MockeTestModel } from "../../infra/Database/mockTestModel";
import { validSubsription } from "../../utils/subscription";
import { getApplicationByUserId, getLast5ApplicationByUserId, getMyApplications } from "../../app/usecases/user/jobApplication";
import { applicationRepositoryEmpl } from "../../infra/repositories/applicationRepository";
import { jobApplyModel } from "../../infra/Database/applyModel";
import { mySavedJobCount } from "../../app/usecases/user/getJobs";
import { JobRepositoryImpl } from "../../infra/repositories/jobRepository";
import { jobModel } from "../../infra/Database/jobModel";
import { chatCount } from "../../app/usecases/Chat/Chat";
import { chatRepositoryEmpl } from "../../infra/repositories/chatRepository";
import { chatModel } from "../../infra/Database/chatModel";
import { getMyLAS } from "../../app/usecases/PublicAns/publicAns";
import { publicAnswerRepositoryImpl } from "../../infra/repositories/PublicAnsRepository";
import { PublicAnsModel } from "../../infra/Database/PublicAnswer";
import NodeCache from 'node-cache'
const myCache = new NodeCache()

const db = userModel;
const userRepository = UserRepositoryImpl(db)
const mockExamRepository = MockExamRepositoryImpl(MockeTestModel)
const applyRepository = applicationRepositoryEmpl(jobApplyModel)
const jobRepository = JobRepositoryImpl(jobModel)
const chatRepository = chatRepositoryEmpl(chatModel)
const publicAnsRepository = publicAnswerRepositoryImpl(PublicAnsModel)






export const userLoginController = async (req: Request, res: Response) => {
    const { email, password } = req.body


    try {
        let user = await loginUser(userRepository)(email, password);
        if (user === 'email') {
            res.json({ message: "Invalid Email" });
        } else if (user === 'password') {
            res.json({ message: "Invalid password" });
        } else if (user === "employer" || user === "candidate") {
            if (user === "employer") {
                res.json({ message: `Verification Pending. You'll get an email when account is verified.`, notVerified: true })
            } else {

                res.json({ message: `Account is banned by admin.` })
            }
        }
        else {
            const { _id, role } = JSON.parse(JSON.stringify(user))

            const accessToken = jsonwebtoken.sign({ sub: { _id, role } }, 'KEY', { expiresIn: '3d' })
            const refreshToken = jsonwebtoken.sign({ sub: { _id, role } }, 'refresh', { expiresIn: '100d' })
            res.cookie('userJWT', refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                maxAge: 100 * 24 * 60 * 60 * 1000
            })
            res.status(200).json({ message: "Login successful", user, accessToken });
        }

    } catch (err) {
        res.status(500).json({ message: "Internal server error" })
    }
}

export const userRegister = async (req: Request, res: Response) => {
    const { firstname, lastname, username, email, password, isGoogle, profileImg } = req.body
    try {
        const user = await signupUser(userRepository)(firstname, lastname, username, email, password, isGoogle, profileImg)
        const { _id, role } = JSON.parse(JSON.stringify(user))

        const accessToken = jsonwebtoken.sign({ sub: { _id, role } }, 'KEY', { expiresIn: '3d' })
        const refreshToken = jsonwebtoken.sign({ sub: { _id, role } }, 'refresh', { expiresIn: '100d' })
        res.cookie('userJWT', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 100 * 24 * 60 * 60 * 1000
        })
        res.status(201).json({ message: "Signup successful", user, accessToken })
    } catch (err) {
        console.log(JSON.parse(JSON.stringify(err)).code);
        if (JSON.parse(JSON.stringify(err)).code == 11000) {
            res.status(403).json({ message: "Email already exist" })
        } else {
            res.status(500).json({ message: "Internal server error" })
        }

    }
}

export const generateOtp = async (req: Request, res: Response) => {
    try {
        const email: string = req.body.email
        const otp = generateSignupOtp(email)
        res.json(otp)
    } catch (error) {

    }

}

export const removeRefreshToken = async (req: Request, res: Response) => {
    try {
        res.clearCookie('userJWT')
        res.json({ status: true })
    } catch (error) {

    }

}

export const auth = async (req: Request, res: Response) => {
    try {
        const { token } = req.body
        let status = validate(token)
        if (status) {
            res.json({ status: true })
        } else {
            const refreshToken = req.cookies.userJWT
            const refreshStatus = validateRefresh(refreshToken)

            if (refreshStatus) {
                const data = jsonwebtoken.verify(refreshToken, 'refresh') as JwtPayload
                const accessToken = jsonwebtoken.sign({ sub: data.sub }, 'KEY', { expiresIn: '3d' })
                res.json({ status: true, accessToken })
            } else {
                res.clearCookie('userJWT')
                res.json({ status: false })
            }
        }
    } catch (error) {

    }


}
export const getNonPremiumUsers = async (req: Request, res: Response) => {
    try {
        const users = await Nonpremium(userRepository)()
        if (res.locals.newadminaccesstoken) res.json({ users, newAdminAccessToken: res.locals.newadminaccesstoken })

        else res.json({ users })

    } catch (error) {

    }
}

export const getPremiumUsers = async (req: Request, res: Response) => {
    try {
        const users = await Premium(userRepository)()
        if (res.locals.newadminaccesstoken) res.json({ users, newAdminAccessToken: res.locals.newadminaccesstoken })
        else res.json({ users })


    } catch (err) {
        console.log(err);
    }
}

export const getAllEmployers = async (req: Request, res: Response) => {
    try {
        const users = await Employers(userRepository)()
        if (res.locals.newadminaccesstoken) res.json({ users, newAdminAccessToken: res.locals.newadminaccesstoken })
        else res.json({ users })


    } catch (err) {
        console.log(err);
    }
}

export const updateBasicInformation = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params
        console.log(req.body);

        if (userId) {

            const { firstname, lastname, phone, qualification, objective, about, imageURL } = req.body
            const response = await updateBasic(userRepository)(firstname, lastname, phone, qualification, objective, about, imageURL, userId)
            console.log(response);
            res.json({response})

        }
    } catch (error) {

    }

}

export const updateProfileInformation = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params
        console.log("hey", userId);

        if (userId) {
            const { father, mother, dob, nationality, permanent, present, marital, gender, skills, projects } = req.body
            const resoponse = await updateProfile(userRepository)(father, mother, dob, nationality, permanent, present, marital, gender, skills, projects, userId)
            return resoponse
        }
    } catch (error) {

    }


}

export const updateEducationInformation = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params


        if (userId) {
            const { education, result, institute, starting, ending } = req.body
            const resoponse = await updateEducation(userRepository)(education, result, institute, starting, ending, userId)
        }
    } catch (error) {

    }

}

export const updateProfInformation = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params
        if (userId) {
            const { company, designation, experience } = req.body
            const resoponse = await updateProfessional(userRepository)(company, designation, experience, userId)
        }
    } catch (error) {

    }

}

export const getUserDataCntrl = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params
        if (userId) {
            const result = await getUserInfo(userRepository)(userId)
            res.status(201).json({ user: result })
        }
    } catch (error) {

    }

}

export const getPremiumPageData = async (req: Request, res: Response) => {
    try {
        const { user } = req.params
        const userdata = await getUserInfo(userRepository)(user)
        const valid = validSubsription(userdata?.Expiry ?? '')
        if (valid) {
            const result = await getUserInfo(userRepository)(user)
            let highscore = 0
            const mockTests = await getMockLastExamByUserId(mockExamRepository)(user)
            highscore = Math.max(...mockTests.map(ele => ele.mark ? ele.mark : 0))
            res.json({ user: result, highscore, mockTests })
        } else {
            const updateUser = await expiredSubs(userRepository)(user)
            res.json({ expired: true })
        }
    } catch (error) {

    }



}

export const getDashboardData = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const applications = await getMyApplications(applyRepository)(id)
        const saved = await mySavedJobCount(jobRepository)(id)
        const chat = await chatCount(chatRepository)(id)
        const LAS = await getMyLAS(publicAnsRepository)(id)
        const applied = await getLast5ApplicationByUserId(applyRepository)(id)
        res.json({ applications, saved: saved[0], chat: chat[0], LAS: LAS[0], applied })

    } catch (error) {

    }
}

export const updateUserProfile = async (req: Request, res: Response) => {
    try {
        const { userId, userName, profileImg, facebook, instagram, linkedIn, gitHub } = req.body
        const data = await updateMyProfile(userRepository)(userId, userName, profileImg, { facebook, instagram, linkedIn, gitHub })
        res.json(data)
    } catch (error) {

    }
}

export const updateEmployerProfile = async (req: Request, res: Response) => {
    try {
        const { EmpId, image, firstname, lastname, username, company, location, facebook, instagram, linkedIn } = req.body
        const data = await updateEmployer(userRepository)(EmpId, image, firstname, lastname, username, company, location, { instagram, facebook, linkedIn })
        res.json(data)
    } catch (error) {

    }
}

export const changePasswordCntrl = async (req: Request, res: Response) => {
    try {
        const { password, newPassword, userId } = req.body

        const status = await checkPassWord(userRepository)(userId, password)
        if (status) {
            const data = await updatePassWord(userRepository)(userId, newPassword)
            res.json({ message: "Password updated" })
        }
        else {
            res.json({ error: "Invalid Password" })
        }
    } catch (error) {

    }
}

export const deactivateAccount = async (req: Request, res: Response) => {
    try {
        const { userId, password } = req.body
        const status = await checkPassWord(userRepository)(userId, password)
        if (status) {
            const data = await blockUser(userRepository)(userId)
            res.json({ status: true, message: 'Success' })
        } else {
            res.json({ error: "Invalid Password" })
        }
    } catch (error) {

    }
}

export const forgotPasswordOTP = async (req: Request, res: Response) => {
    try {
        const { email } = req.body
        const user = await getUserbyEmail(userRepository)(email)
        if (user) {
            if (!user.isGoogle) {
                const otp = generateForgotPasswordOtp(email)
                myCache.set(email, otp, 180)
                res.json({ status: true })

            } else {
                res.json({ error: 'Sorry, "Forgot Password" is unavailable for Google Auth accounts. ' })

            }
        } else {
            res.json({ error: 'Email not registered.' })
        }
    } catch (error) {

    }
}

export const forgotpasswordOTPSubmit = async (req: Request, res: Response) => {
    try {
        const {otp,email} =req.body
        const generatedOTP=myCache.get(email)
        if(generatedOTP){
            console.log(generatedOTP,otp);
            
            if(generatedOTP==otp) {
                res.json({status:true})
            }else{
                res.json({error:"Invalid OTP"})
            }
            
        }else{
            res.json({error:'OTP Expired , Try Again'})
        }
    } catch (error) {

    }
}

export const updatePasswordCntrl=async (req: Request, res: Response) => {
    try {
        console.log(req.body);
        
        const {email,password}=req.body
        const data=await updatePassWordByEmail(userRepository)(email,password)
        
        
        if(data.matchedCount===1){
            res.json({status:true})
        }else{
            res.json({error:"Something went wrong!!"})
        }
    } catch (error) {
        console.log(error);
        
    }
}