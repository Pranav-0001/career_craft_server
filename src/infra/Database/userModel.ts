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

    },
    company:{
        type:'string',
        default:null
    },
    location:{
        type:'string',
        default:null
    },
    role:{
        type:'string',
        default:'candidate'
    },
    profileImg:{
        type:'string',
        default:'https://cdn-icons-png.flaticon.com/512/3607/3607444.png'
    },
    isGoogle:{
        type:'boolean',
        default:false
    }

})

export const userModel: MongoDBUser = mongoose.connection.model<Document<any, any, any> & User>('user', userSchema);