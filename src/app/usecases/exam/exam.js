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
exports.submitAnswer = exports.setExamAttended = exports.getCandidateFromExam = exports.getResById = exports.getExamById = exports.generateTest = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const generateTest = (examRepository) => (questions, candidate, employer) => __awaiter(void 0, void 0, void 0, function* () {
    const exam = yield examRepository.createExam(questions, candidate, employer);
    return exam;
});
exports.generateTest = generateTest;
const getExamById = (examRepository) => (examId) => __awaiter(void 0, void 0, void 0, function* () {
    const exam = yield examRepository.getExam(examId);
    return exam;
});
exports.getExamById = getExamById;
const getResById = (examRepository) => (examId) => __awaiter(void 0, void 0, void 0, function* () {
    const exam = yield examRepository.getRes(examId);
    return exam;
});
exports.getResById = getResById;
const getCandidateFromExam = (examRepository) => (examId) => __awaiter(void 0, void 0, void 0, function* () {
    const candidate = yield examRepository.getCandidate(examId);
    return candidate;
});
exports.getCandidateFromExam = getCandidateFromExam;
const setExamAttended = (examRepository) => (examId, time) => __awaiter(void 0, void 0, void 0, function* () {
    const exam = yield examRepository.setAttended(examId, time);
});
exports.setExamAttended = setExamAttended;
const submitAnswer = (examRepository) => (answer, exam) => __awaiter(void 0, void 0, void 0, function* () {
    const answers = answer.map((obj) => { return Object.assign(Object.assign({}, obj), { queId: new mongoose_1.default.Types.ObjectId(obj.queId) }); });
    const mark = answers.reduce((val, currObj) => {
        if (currObj.status === true) {
            return val + 1;
        }
        else {
            return val;
        }
    }, 0);
    const res = yield examRepository.setAnswer(answers, exam, mark);
    return res;
});
exports.submitAnswer = submitAnswer;
