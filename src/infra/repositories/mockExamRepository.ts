import { MockeTestModel, MongoDBMock } from "../Database/mockTestModel";
import { MockTestType } from "../../domain/models/exam";
import { QuestionType } from "../../domain/models/question";
import mongoose, { UpdateWriteOpResult } from "mongoose";


export type MockExamRepository={
    createMockTest:(quesions:QuestionType[],candidate:string)=>Promise<MockTestType>
    getMockTest:(exam:string)=>Promise<MockTestType | null>
    getLast5MockTests:(user:string)=>Promise<MockTestType[] >
    updateAttended:(exam:string)=>Promise<UpdateWriteOpResult>
    updateAnswer:(answer: { queId?: string, userAns?: string, status?: boolean }[],mark:number, exam: string)=>Promise<UpdateWriteOpResult>
}

export const MockExamRepositoryImpl = (examModel:MongoDBMock):MockExamRepository=>{
    const createMockTest=async(questions:QuestionType[],candidate:string)=>{
        const exam:MockTestType={
            questions,
            candidate:new mongoose.Types.ObjectId(candidate),
        } 
        const res =await examModel.create(exam)
        return res 
        
    }
    const getMockTest=async(exam:string)=>{
        const examId=new mongoose.Types.ObjectId(exam)
        const res=await examModel.findOne({_id:examId})
        return res
    }

    const updateAttended=async(exam:string)=>{
        const examId=new mongoose.Types.ObjectId(exam)
        const time=new Date().toString()
        const res=await examModel.updateOne({_id:examId},{$set:{attended:true,startedAt:time}})
        return res
    }
    const updateAnswer=async (answer: { queId?: string, userAns?: string, status?: boolean }[],mark:number, exam: string)=>{
        let id=new mongoose.Types.ObjectId(exam)
        const time=new Date().toString()

        const res= await examModel.updateOne({_id:id},{$set:{answers:answer,mark,submitted:true,submittedAt:time}})
        return res
    }
    const getLast5MockTests=async(user:string)=>{
        const id=new mongoose.Types.ObjectId(user)
        const data=await examModel.find({candidate:id})
        return data
    }
    return {
        createMockTest,
        getMockTest,
        updateAttended,
        updateAnswer,
        getLast5MockTests
    }
}