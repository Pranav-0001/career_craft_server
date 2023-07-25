import { Request,Response } from "express";
import { SubscriptionRepositoryImpl } from "../../infra/repositories/subscriptionRepository";
import { subscriptionModel } from "../../infra/Database/subscriptionModel";
import { subscribeAdd } from "../../app/usecases/Subscription/subscription";
import { userModel } from "../../infra/Database/userModel";
import { UserRepositoryImpl } from "../../infra/repositories/userRepository";
import { userUpdateSub } from "../../app/usecases/user/updateUser";

const SubscriptionRepository=SubscriptionRepositoryImpl(subscriptionModel)
const userRepository = UserRepositoryImpl(userModel)

export const addSubscriptionCntrl=async(req:Request,res:Response)=>{
    try {
       console.log(req.body);
       
        const {user,time,orderId,status} =req.body
        const data= await subscribeAdd(SubscriptionRepository)(user,time,orderId,status)
        await userUpdateSub(userRepository)(user)
        res.json({status:true,sub:data})

    } catch (error) {
        console.log(error);
        
    }
}