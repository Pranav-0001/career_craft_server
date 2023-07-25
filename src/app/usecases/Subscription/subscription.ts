import { subscriptionRepository } from "../../../infra/repositories/subscriptionRepository"


export const subscribeAdd=(subscriptionRepository:subscriptionRepository)=>async(user:string,time:string,orderId:string,status:string)=>{
    const data=await subscriptionRepository.addSubscription(user,time,orderId,status)
    return data
}