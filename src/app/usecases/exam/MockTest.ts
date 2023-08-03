import mongoose from "mongoose";
import { MockTestType } from "../../../domain/models/exam";
import { MockeTestModel } from "../../../infra/Database/mockTestModel";
import { MockExamRepository } from "../../../infra/repositories/mockExamRepository";
import { QuestionType } from "../../../domain/models/question";

export const generateMockTest = (MockExamRepository: MockExamRepository) => async (questions: QuestionType[], candidate: string) => {
    const exam = await MockExamRepository.createMockTest(questions, candidate)
    return exam
}

export const getMockExamById=(MockExamRepository: MockExamRepository)=>async (examId:string)=>{
    const exam =await MockExamRepository.getMockTest(examId)
    return exam
}

export const updateAttended=(MockExamRepository: MockExamRepository)=>async (examId:string)=>{
    const exam =await MockExamRepository.updateAttended(examId)
    return exam
}

export const updateAnswer=(MockExamRepository:MockExamRepository)=>async (answer: { queId?: string, userAns?: string, status?: boolean }[], exam: string)=>{
    const mark = answer.reduce((val, currObj) => {
        if (currObj.status === true) {
            return val + 1;
        } else {
            return val; 
        }
    }, 0);
    const updated=await MockExamRepository.updateAnswer(answer,mark,exam)
    return updated
}

export const getMockLastExamByUserId=(MockExamRepository:MockExamRepository)=>async(user:string)=>{
    const exams=await MockExamRepository.getLast5MockTests(user)
    return exams
}

export const getMockTestByUserId=(MockExamRepository:MockExamRepository)=>async(user:string,page:string)=>{
    const exams=await MockExamRepository.getMockTestsByUser(user,page)
    return exams
}