import { Request,Response } from "express";
import { SubscriptionRepositoryImpl } from "../../infra/repositories/subscriptionRepository";
import { subscriptionModel } from "../../infra/Database/subscriptionModel";
import { subscribeAdd, subscriptionCount, subscriptionHistoryAdmin } from "../../app/usecases/Subscription/subscription";
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

export const subscriptionHistoryForadmin=async(req:Request,res:Response)=>{
    try {
        const page=parseInt(req.params.page)
        const data=await subscriptionHistoryAdmin(SubscriptionRepository)(page)
        const count=await subscriptionCount(SubscriptionRepository)()
        let pages:number[]=[]
        for(let i=1;i<=count;i++){
            pages.push(i)
        }
        res.json({data,pages})

    } catch (error) {
        console.log(error);
        
    }
}