"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockExamRepositoryImpl = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const MockExamRepositoryImpl = (examModel) => {
    const createMockTest = (questions, candidate) => __awaiter(void 0, void 0, void 0, function* () {
        const exam = {
            questions,
            candidate: new mongoose_1.default.Types.ObjectId(candidate),
        };
        const res = yield examModel.create(exam);
        return res;
    });
    const getMockTest = (exam) => __awaiter(void 0, void 0, void 0, function* () {
        const examId = new mongoose_1.default.Types.ObjectId(exam);
        const res = yield examModel.findOne({ _id: examId });
        return res;
    });
    const updateAttended = (exam) => __awaiter(void 0, void 0, void 0, function* () {
        const examId = new mongoose_1.default.Types.ObjectId(exam);
        const time = new Date().toString();
        const res = yield examModel.updateOne({ _id: examId }, { $set: { attended: true, startedAt: time } });
        return res;
    });
    const updateAnswer = (answer, mark, exam) => __awaiter(void 0, void 0, void 0, function* () {
        let id = new mongoose_1.default.Types.ObjectId(exam);
        const time = new Date().toString();
        const res = yield examModel.updateOne({ _id: id }, { $set: { answers: answer, mark, submitted: true, submittedAt: time } });
        return res;
    });
    const getLast5MockTests = (user) => __awaiter(void 0, void 0, void 0, function* () {
        const id = new mongoose_1.default.Types.ObjectId(user);
        const data = yield examModel.find({ candidate: id }).sort({ _id: -1 }).limit(5);
        return data;
    });
    const getMockTestsByUser = (user, page) => __awaiter(void 0, void 0, void 0, function* () {
        const skip = (parseInt(page) - 1) * 10;
        const id = new mongoose_1.default.Types.ObjectId(user);
        const data = yield examModel.find({ candidate: id }).sort({ _id: -1 }).skip(skip).limit(10);
        const count = yield examModel.countDocuments();
        return { exams: data, count };
    });
    return {
        createMockTest,
        getMockTest,
        updateAttended,
        updateAnswer,
        getLast5MockTests,
        getMockTestsByUser,
    };
};
exports.MockExamRepositoryImpl = MockExamRepositoryImpl;
