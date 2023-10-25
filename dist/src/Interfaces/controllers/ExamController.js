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
exports.submitExam = exports.setAttended = exports.getRestrl = exports.getExamcntrl = exports.generateExam = void 0;
const question_1 = require("../../app/usecases/questions/question");
const ExamRepository_1 = require("../../infra/repositories/ExamRepository");
const examModel_1 = require("../../infra/Database/examModel");
const questionRepository_1 = require("../../infra/repositories/questionRepository");
const questionModel_1 = require("../../infra/Database/questionModel");
const exam_1 = require("../../app/usecases/exam/exam");
const examRepository = (0, ExamRepository_1.ExamRepositoryImpl)(examModel_1.examModel);
const questionRepository = (0, questionRepository_1.QuestionRepositoryImpl)(questionModel_1.QuestionModel);
const generateExam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { candidateId, empId } = req.body;
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
        const exam = yield (0, exam_1.generateTest)(examRepository)(questions, candidateId, empId);
        res.json({ exam });
    }
    catch (err) {
    }
});
exports.generateExam = generateExam;
const getExamcntrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { exam } = req.params;
        const examData = yield (0, exam_1.getExamById)(examRepository)(exam);
        res.json(examData);
    }
    catch (error) {
    }
});
exports.getExamcntrl = getExamcntrl;
const getRestrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { exam } = req.params;
        const examData = yield (0, exam_1.getResById)(examRepository)(exam);
        const candidate = yield (0, exam_1.getCandidateFromExam)(examRepository)(exam);
        if (examData)
            res.json({ examData, candidate });
        else
            res.json(examData);
    }
    catch (error) {
    }
});
exports.getRestrl = getRestrl;
const setAttended = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { exam } = req.body;
        const time = new Date().toLocaleTimeString();
        const result = yield (0, exam_1.setExamAttended)(examRepository)(exam, time);
        return result;
    }
    catch (error) {
    }
});
exports.setAttended = setAttended;
const submitExam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { answer, exam } = req.body;
        console.log({ answer, exam });
        const data = yield (0, exam_1.submitAnswer)(examRepository)(answer, exam);
        // console.log(data);
        res.json({ data, status: true });
    }
    catch (error) {
    }
});
exports.submitExam = submitExam;
