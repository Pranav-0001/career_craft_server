import mongoose, { UpdateWriteOpResult } from "mongoose";
import { Subscription } from "../../domain/models/subscription";
 import { MongoDBSubscription } from "../Database/subscriptionModel";
 export type subscriptionRepository={
    addSubscription:(user:string,time:string,orderId:string,status:string)=>Promise<Subscription>
    totalRevenue:()=>Promise<number>
    subscriptions:()=>Promise<Subscription[]>
    sunbscriptionHist:(page:number)=>Promise<Subscription[]>
    countDocs:()=>Promise<number>
 }

 export const SubscriptionRepositoryImpl = (subsModel:MongoDBSubscription):subscriptionRepository=>{
    const addSubscription=async(user:string,time:string,orderId:string,status:string)=>{

        const res=await subsModel.create({orderId,time, user:new mongoose.Types.ObjectId(user),status})
        return res
    }
    const totalRevenue=async()=>{
        const number=await subsModel.countDocuments()
        const revenue=number*29
        return revenue
    }
    const subscriptions=async()=>{
        const data=await subsModel.find()
        return data
    }
    const sunbscriptionHist=async(page:number)=>{
        const skip=(page-1)*10
        console.log({skip});
        
        const data=await subsModel.find().sort({_id:-1}).skip(skip).limit(10).populate('user')
        return data
    }
    const countDocs=async()=>{
        const data=await subsModel.countDocuments()
        return data
    }
    return{
        addSubscription,
        totalRevenue,
        subscriptions,
        sunbscriptionHist,
        countDocs
    }
 }