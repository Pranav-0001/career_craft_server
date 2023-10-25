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
exports.QuestionRepositoryImpl = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const QuestionRepositoryImpl = (questionModel) => {
    const createQuestion = (question, answer, options, difficulty, addedBy, role, code) => __awaiter(void 0, void 0, void 0, function* () {
        const obj = {
            question,
            answer,
            options,
            difficulty,
            addedBy: new mongoose_1.default.Types.ObjectId(addedBy),
            role,
            code
        };
        const result = yield questionModel.create(obj);
        return result;
    });
    const getQuestions = (page, empId) => __awaiter(void 0, void 0, void 0, function* () {
        const skip = (parseInt(page) - 1) * 10;
        const id = new mongoose_1.default.Types.ObjectId(empId);
        const questions = yield questionModel.find({ addedBy: id }).skip(skip).limit(10);
        return questions;
    });
    const getCount = (empId) => __awaiter(void 0, void 0, void 0, function* () {
        const id = new mongoose_1.default.Types.ObjectId(empId);
        const count = yield questionModel.countDocuments({ addedBy: id });
        return count;
    });
    const getQuestionsByDiff = (diff) => __awaiter(void 0, void 0, void 0, function* () {
        const questions = yield questionModel.find({ status: true, difficulty: diff });
        return questions;
    });
    const getAllQuestions = (page) => __awaiter(void 0, void 0, void 0, function* () {
        const skip = (parseInt(page) - 1) * 10;
        const count = yield questionModel.countDocuments();
        const questions = yield questionModel.find().skip(skip).limit(10);
        return { questions, count };
    });
    const disableQue = (qId) => __awaiter(void 0, void 0, void 0, function* () {
        const id = new mongoose_1.default.Types.ObjectId(qId);
        const update = yield questionModel.updateOne({ _id: id }, { $set: { status: false } });
        return update;
    });
    const enableQue = (qId) => __awaiter(void 0, void 0, void 0, function* () {
        const id = new mongoose_1.default.Types.ObjectId(qId);
        const update = yield questionModel.updateOne({ _id: id }, { $set: { status: true } });
        return update;
    });
    const questionEdit = (qId, question, answer, options, difficulty, code) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield questionModel.updateOne({ _id: new mongoose_1.default.Types.ObjectId(qId) }, { $set: { question: question, answer: answer, options: options, difficulty: difficulty, code: code } });
        return data;
    });
    const getQuestion = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield questionModel.findOne({ _id: new mongoose_1.default.Types.ObjectId(id) });
        return data;
    });
    return {
        createQuestion,
        getQuestions,
        getCount,
        getQuestionsByDiff,
        getAllQuestions,
        disableQue,
        enableQue,
        questionEdit,
        getQuestion
    };
};
exports.QuestionRepositoryImpl = QuestionRepositoryImpl;
