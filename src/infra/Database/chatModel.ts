import mongoose, { Model, Schema ,Document } from "mongoose";
import { Chat } from "../../domain/models/chat";

export type MongoDBChat=Model<Document<any,any,any>&Chat>;

const chatSchema = new Schema<Chat>({
    chatName:{
        type:'string',
        required:true
    },
    users:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }],
    latestMessage:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'message'
    }
},
{
    timestamps:true
})

export const chatModel:MongoDBChat=mongoose.connection.model<Document<any, any, any> & Chat>('chat', chatSchema);
