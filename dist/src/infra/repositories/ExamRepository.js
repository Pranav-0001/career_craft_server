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
exports.ExamRepositoryImpl = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ExamRepositoryImpl = (examModel) => {
    const createExam = (questions, candidate, employer) => __awaiter(void 0, void 0, void 0, function* () {
        const exam = {
            questions,
            candidate: new mongoose_1.default.Types.ObjectId(candidate),
            employer: new mongoose_1.default.Types.ObjectId(employer),
        };
        const createedExam = yield examModel.create(exam);
        return createedExam;
    });
    const getExam = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const examId = new mongoose_1.default.Types.ObjectId(id);
        const exam = yield examModel.findOne({ _id: examId });
        return exam;
    });
    const getRes = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const examId = new mongoose_1.default.Types.ObjectId(id);
        const exam = yield examModel.aggregate([
            {
                $match: { _id: examId }
            },
            {
                $unwind: '$answers'
            },
            {
                $project: {
                    answers: 1, mark: 1
                }
            },
            {
                $lookup: {
                    from: 'questions',
                    localField: 'answers.queId',
                    foreignField: '_id',
                    as: 'question'
                }
            }
        ]);
        return exam;
    });
    const setAttended = (id, time) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield examModel.updateOne({ _id: new mongoose_1.default.Types.ObjectId(id) }, { $set: { attended: true, startedAt: time } });
        return res;
    });
    const setAnswer = (answers, examId, mark) => __awaiter(void 0, void 0, void 0, function* () {
        let id = new mongoose_1.default.Types.ObjectId(examId);
        const res = yield examModel.updateOne({ _id: id }, { $set: { answers: answers, mark, submitted: true } });
        return res;
    });
    const getCandidate = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const examId = new mongoose_1.default.Types.ObjectId(id);
        const candidate = yield examModel.findOne({ _id: examId }).populate('candidate');
        return candidate;
    });
    return {
        createExam,
        getExam,
        setAttended,
        setAnswer,
        getRes,
        getCandidate
    };
};
exports.ExamRepositoryImpl = ExamRepositoryImpl;
