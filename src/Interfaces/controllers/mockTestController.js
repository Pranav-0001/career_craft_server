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
exports.getMockResCntrl = exports.getMyMockTests = exports.submitMockAnswerCntrl = exports.setMockAttendedCntrl = exports.getMockTestCntrl = exports.CreateMockTestCntrl = void 0;
const question_1 = require("../../app/usecases/questions/question");
const questionRepository_1 = require("../../infra/repositories/questionRepository");
const questionModel_1 = require("../../infra/Database/questionModel");
const MockTest_1 = require("../../app/usecases/exam/MockTest");
const mockExamRepository_1 = require("../../infra/repositories/mockExamRepository");
const mockTestModel_1 = require("../../infra/Database/mockTestModel");
const userRepository_1 = require("../../infra/repositories/userRepository");
const userModel_1 = require("../../infra/Database/userModel");
const updateUser_1 = require("../../app/usecases/user/updateUser");
const questionRepository = (0, questionRepository_1.QuestionRepositoryImpl)(questionModel_1.QuestionModel);
const mockExamRepository = (0, mockExamRepository_1.MockExamRepositoryImpl)(mockTestModel_1.MockeTestModel);
const userRepository = (0, userRepository_1.UserRepositoryImpl)(userModel_1.userModel);
const CreateMockTestCntrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { candidateId } = req.body;
        const easy = yield (0, question_1.getQuestionsByDiff)(questionRepository)('Easy');
        const med = yield (0, question_1.getQuestionsByDiff)(questionRepository)('Medium');
        const hard = yield (0, question_1.getQuestionsByDiff)(questionRepository)('Hard');
        let questions = [];
        for (let i = 0; i < 3; i++) {
            let randomIndex = Math.floor(Math.random() * easy.length);
            questions.push(easy[randomIndex]);
            easy.splice(randomIndex, 1);
        }
        for (let i = 0; i < 3; i++) {
            let randomIndex = Math.floor(Math.random() * med.length);
            questions.push(med[randomIndex]);
            med.splice(randomIndex, 1);
        }
        for (let i = 0; i < 4; i++) {
            let randomIndex = Math.floor(Math.random() * hard.length);
            questions.push(hard[randomIndex]);
            hard.splice(randomIndex, 1);
        }
        const exam = yield (0, MockTest_1.generateMockTest)(mockExamRepository)(questions, candidateId);
        res.json(exam);
    }
    catch (error) {
    }
});
exports.CreateMockTestCntrl = CreateMockTestCntrl;
const getMockTestCntrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const examData = yield (0, MockTest_1.getMockExamById)(mockExamRepository)(id);
        res.json(examData);
    }
    catch (error) {
    }
});
exports.getMockTestCntrl = getMockTestCntrl;
const setMockAttendedCntrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { exam } = req.body;
        const status = yield (0, MockTest_1.updateAttended)(mockExamRepository)(exam);
        res.json(status);
    }
    catch (error) {
    }
});
exports.setMockAttendedCntrl = setMockAttendedCntrl;
const submitMockAnswerCntrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { answer, exam, userId } = req.body;
        const updated = yield (0, MockTest_1.updateAnswer)(mockExamRepository)(answer, exam);
        if (updated) {
            const mockTests = yield (0, MockTest_1.getMockLastExamByUserId)(mockExamRepository)(userId);
            const totalQue = mockTests.length * 10;
            const totalAns = mockTests.reduce((t, ele) => ele.mark ? t + ele.mark : t + 0, 0);
            const per = (totalAns / totalQue) * 100;
            yield (0, updateUser_1.updateUserPoint)(userRepository)(userId, per);
        }
        res.json(updated);
    }
    catch (error) {
    }
});
exports.submitMockAnswerCntrl = submitMockAnswerCntrl;
const getMyMockTests = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = req.query.page;
        const userId = req.query.userId;
        const { exams, count } = yield (0, MockTest_1.getMockTestByUserId)(mockExamRepository)(userId, page);
        const pages = Math.ceil(count / 10);
        const pagination = [];
        for (let i = 1; i <= pages; i++) {
            pagination.push(i);
        }
        res.json({ exams, pagination });
    }
    catch (error) {
    }
});
exports.getMyMockTests = getMyMockTests;
const getMockResCntrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { exam } = req.params;
        const data = yield (0, MockTest_1.getMockExamById)(mockExamRepository)(exam);
        res.json(data);
    }
    catch (error) {
    }
});
exports.getMockResCntrl = getMockResCntrl;
