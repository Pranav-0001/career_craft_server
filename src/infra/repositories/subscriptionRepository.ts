import mongoose, { UpdateWriteOpResult } from "mongoose";
import { Subscription } from "../../domain/models/subscription";
 import { MongoDBSubscription } from "../Database/subscriptionModel";
 export type subscriptionRepository={
    addSubscription:(user:string,time:string,orderId:string,status:string)=>Promise<Subscription>
 }

 export const SubscriptionRepositoryImpl = (subsModel:MongoDBSubscription):subscriptionRepository=>{
    const addSubscription=async(user:string,time:string,orderId:string,status:string)=>{

        const res=await subsModel.create({orderId,time, user:new mongoose.Types.ObjectId(user),status})
        return res
    }
    return{
        addSubscription
    }
 }