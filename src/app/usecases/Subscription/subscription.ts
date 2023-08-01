import { subscriptionRepository } from "../../../infra/repositories/subscriptionRepository"


export const subscribeAdd=(subscriptionRepository:subscriptionRepository)=>async(user:string,time:string,orderId:string,status:string)=>{
    const data=await subscriptionRepository.addSubscription(user,time,orderId,status)
    return data
}

export const totalRevenueAdmin=(subscriptionRepository:subscriptionRepository)=>async()=>{
    const data:number=await subscriptionRepository.totalRevenue()
    return data
}

export const subscriptionHistory=(subscriptionRepository:subscriptionRepository)=>async()=>{
    const data=await subscriptionRepository.subscriptions()
    return data
}

export const subscriptionHistoryAdmin=(subscriptionRepository:subscriptionRepository)=>async(page:number)=>{
    const data=await subscriptionRepository.sunbscriptionHist(page)
    return data
}
export const subscriptionCount=(subscriptionRepository:subscriptionRepository)=>async()=>{
    const data=await subscriptionRepository.countDocs()
    return data
}