import mongoose, { Model, Schema ,Document } from "mongoose";
import { PublicQuestion } from "../../domain/models/publicQuestion";


export type MongoDBPublicQue=Model<Document<any,any,any>&PublicQuestion>;

const PublicQueSchema = new Schema<PublicQuestion>({
    title:{
        type:'string',
        required:true
    },
    language:{
        type:'string',
        required:true
    },
    question:{
        type:'string',
        required:true
    },
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
    answeredBy:{
        type:[mongoose.Schema.Types.ObjectId]
    }
    
},
{
    timestamps:true
})

export const PublicQueModel:MongoDBPublicQue=mongoose.connection.model<Document<any, any, any> & PublicQuestion>('pubicque',PublicQueSchema );
