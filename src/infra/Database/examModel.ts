import mongoose, { Model, Schema ,Document } from "mongoose";
import { examType } from "../../domain/models/exam";

export type MongoDBExam=Model<Document<any,any,any>&examType>;

const ExamSchema = new Schema<examType>({
    candidate:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    employer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    questions:{
        type:Array,
    },
    answers:{
        type:Array
    },
    attended:{
        type:'boolean',
        default:false
    },
    startedAt:{
        type:'string',
    },
    submitted:{
        type:'boolean',
        default:false
    },
    date:{
        type:'string'
    },
    mark:{
        type:'number',
    }

},
{
    timestamps:true
})

export const examModel:MongoDBExam=mongoose.connection.model<Document<any, any, any> & examType>('exam',ExamSchema );
