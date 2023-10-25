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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMockTestByUserId = exports.getMockLastExamByUserId = exports.updateAnswer = exports.updateAttended = exports.getMockExamById = exports.generateMockTest = void 0;
const generateMockTest = (MockExamRepository) => (questions, candidate) => __awaiter(void 0, void 0, void 0, function* () {
    const exam = yield MockExamRepository.createMockTest(questions, candidate);
    return exam;
});
exports.generateMockTest = generateMockTest;
const getMockExamById = (MockExamRepository) => (examId) => __awaiter(void 0, void 0, void 0, function* () {
    const exam = yield MockExamRepository.getMockTest(examId);
    return exam;
});
exports.getMockExamById = getMockExamById;
const updateAttended = (MockExamRepository) => (examId) => __awaiter(void 0, void 0, void 0, function* () {
    const exam = yield MockExamRepository.updateAttended(examId);
    return exam;
});
exports.updateAttended = updateAttended;
const updateAnswer = (MockExamRepository) => (answer, exam) => __awaiter(void 0, void 0, void 0, function* () {
    const mark = answer.reduce((val, currObj) => {
        if (currObj.status === true) {
            return val + 1;
        }
        else {
            return val;
        }
    }, 0);
    const updated = yield MockExamRepository.updateAnswer(answer, mark, exam);
    return updated;
});
exports.updateAnswer = updateAnswer;
const getMockLastExamByUserId = (MockExamRepository) => (user) => __awaiter(void 0, void 0, void 0, function* () {
    const exams = yield MockExamRepository.getLast5MockTests(user);
    return exams;
});
exports.getMockLastExamByUserId = getMockLastExamByUserId;
const getMockTestByUserId = (MockExamRepository) => (user, page) => __awaiter(void 0, void 0, void 0, function* () {
    const exams = yield MockExamRepository.getMockTestsByUser(user, page);
    return exams;
});
exports.getMockTestByUserId = getMockTestByUserId;
