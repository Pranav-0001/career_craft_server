import { Request, Response } from "express"
import { loginAdmin } from "../../app/usecases/admin/loginAdmin"
import { AdminRepositoryImpl } from "../../infra/repositories/adminRespository"
import { adminModel } from "../../infra/Database/adminModel"
import jsonwebtoken from 'jsonwebtoken'
import { countUsers } from "../../app/usecases/admin/getUsers"
import { UserRepositoryImpl } from "../../infra/repositories/userRepository"
import { userModel } from "../../infra/Database/userModel"
import { subscriptionHistory, totalRevenueAdmin } from "../../app/usecases/Subscription/subscription"
import { SubscriptionRepositoryImpl } from "../../infra/repositories/subscriptionRepository"
import { subscriptionModel } from "../../infra/Database/subscriptionModel"

const adminRepository = AdminRepositoryImpl(adminModel)
const SubscriptionRepository = SubscriptionRepositoryImpl(subscriptionModel)

const userRepository = UserRepositoryImpl(userModel)


export const adminLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body
    try {
        const admin = await loginAdmin(adminRepository)(email, password)
        if (admin === "email") {
            res.json({ email: "Invalid Email" })

        } else if (admin === "password") {
            res.json({ email: "Invalid Password" })


        } else if (admin) {
            const datas = JSON.parse(JSON.stringify(admin))

            const accessToken = jsonwebtoken.sign({ sub: { role: 'Admin', id: datas._id } }, 'KEY', { expiresIn: '3d' })
            const refreshToken = jsonwebtoken.sign({ sub: { role: 'Admin', id: datas._id } }, 'refresh', { expiresIn: '100d' })
            res.cookie('adminJWT', refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                maxAge: 100 * 24 * 60 * 60 * 1000
            })
            res.json({ admin, accessToken })

        }
    } catch (error) {

    }

}

export const adminLogout = async (req: Request, res: Response) => {
    try {
        res.clearCookie('adminJWT')
        res.json({ signout: true })
    } catch (error) {

    }

}

export const adminDashboardData = async (req: Request, res: Response) => {
    try {
        const { number, premium, emp } = await countUsers(userRepository)()
        const revenue = await totalRevenueAdmin(SubscriptionRepository)()
        const subscription = await subscriptionHistory(SubscriptionRepository)()
        res.json({ users: number, premium, emp, revenue, subscription })
    } catch (error) {

    }

}