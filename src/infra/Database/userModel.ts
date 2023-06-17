import mongoose, { Model, Schema ,Document } from "mongoose";
import { User } from "../../domain/models/user";

export type MongoDBUser = Model<Document<any, any, any> & User>;


const userSchema=new Schema<User>({
    email:{
        type:'string',
        required:true,
        unique:true
    },
    username:{
        type:'string',
        required:true,

    },
    firstname:{
        type:'string',
        required:true,

    },
    lastname:{
        type:'string',
        required:true,

    },
    password:{
        type:'string',
        required:true,

    }

})

export const userModel: MongoDBUser = mongoose.connection.model<Document<any, any, any> & User>('user', userSchema);