import mongoose, { Model, Schema ,Document } from "mongoose";
import { QuestionType } from "../../domain/models/question";

export type MongoDBQuestion=Model<Document<any,any,any>&QuestionType>;

const questionSchema = new Schema<QuestionType>({
  question:{
    type:'string',
    required:true
  },
  answer:{
    type:'string',
    required:true
  },
  options:{
    type:['string'],
    required:true
  } ,
  addedBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
  },
  code:{
    type:'string'
  },
  difficulty:{
    type:'string'
  },
  role:{
    type:'string'
  },
  status:{
    type:'boolean',
    default:true
  }
})

export const QuestionModel:MongoDBQuestion=mongoose.connection.model<Document<any, any, any> & QuestionType>('question', questionSchema);
