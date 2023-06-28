import mongoose, { Model, Schema ,Document } from "mongoose";
import { admin } from "../../domain/models/admin";

export type MongoDBAdmnin=Model<Document<any,any,any>&admin>;

const adminSchema = new Schema<admin>({
    email:{
        type:'string',
        required:true
    },
    password:{
        type:'string',
        required:true
    },
    profileImg:{
        type:'string',
        default:"https://st4.depositphotos.com/7486768/19781/v/600/depositphotos_197819990-stock-illustration-profile-anonymous-face-icon-gray.jpg"
    }
})


export const adminModel:MongoDBAdmnin=mongoose.connection.model<Document<any, any, any> & admin>('admins', adminSchema);