import mongoose from "mongoose";

export interface Subscription{
    user?:mongoose.Types.ObjectId,
    time?:string,
    orderId?:string,
    status?:string
}