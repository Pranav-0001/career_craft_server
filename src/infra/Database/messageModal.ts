import mongoose, { Model, Schema ,Document } from "mongoose";
import { Message } from "../../domain/models/chat";

export type MongoDBMessage=Model<Document<any,any,any>&Message>;

const MsgSchema = new Schema<Message>({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    content:{
        type:'String',
        trim:true
    },
    chat:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'chat'
    },
    isExam:{
        type:'boolean',
        default:false
    },
    Exam:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'exam'
    }
},
{
    timestamps:true
})

export const MsgModel:MongoDBMessage=mongoose.connection.model<Document<any, any, any> & Message>('message', MsgSchema);
