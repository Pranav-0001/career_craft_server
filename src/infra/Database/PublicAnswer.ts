import mongoose, { Model, Schema ,Document } from "mongoose";
import { PublicAnswer } from "../../domain/models/publicQuestion";


export type MongoDBPublicAns=Model<Document<any,any,any>&PublicAnswer>;

const PublicAnsSchema = new Schema<PublicAnswer>({
    code:{
        type:'string'
    },
    likes:{
        type:'number',
        default:0
    },
    likedBy:{
        type:['string']
    },
    addedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    status:{
        type:'boolean',
        default:true
    },
    answer:{
        type:'string',

    },
    questionId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'pubicque'
    } 
},
{
    timestamps:true
})

export const PublicAnsModel:MongoDBPublicAns=mongoose.connection.model<Document<any, any, any> & PublicAnswer>('pubicans', PublicAnsSchema);
