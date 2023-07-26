import mongoose, { Model, Schema ,Document } from "mongoose";
import { MockTestType } from "../../domain/models/exam";

export type MongoDBMock=Model<Document<any,any,any>&MockTestType>;

const MockExamSchema = new Schema<MockTestType>({
    candidate:{
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
    },
    submittedAt:{
        type:'string'
    }
},
{
    timestamps:true
})

export const MockeTestModel:MongoDBMock=mongoose.connection.model<Document<any, any, any> & MockTestType>('MockTest',MockExamSchema );
