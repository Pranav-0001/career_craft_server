import mongoose, { Model, Schema ,Document } from "mongoose";
import { Subscription } from "../../domain/models/subscription";

export type MongoDBSubscription = Model<Document<any, any, any> & Subscription>;

const subscriptionSchema = new Schema<Subscription>({
    user:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    },
    orderId:{
        type:'string'
    },
    status:{
        type:'string'
    },
    time:{
        type:'string'
    }
})

export const subscriptionModel:MongoDBSubscription=mongoose.connection.model<Document<any, any, any> & Subscription>('subscriptions', subscriptionSchema);