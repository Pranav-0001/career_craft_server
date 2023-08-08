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
exports.getQuesrionByQId = exports.QuestionEditCntrl = exports.quesDisbleCntrl = exports.quesEnableCntrl = exports.allQuestions = exports.getAllQuestionsCntrl = exports.addQuestionCntrl = void 0;
const question_1 = require("../../app/usecases/questions/question");
const questionRepository_1 = require("../../infra/repositories/questionRepository");
const questionModel_1 = require("../../infra/Database/questionModel");
const QueRepository = (0, questionRepository_1.QuestionRepositoryImpl)(questionModel_1.QuestionModel);
const addQuestionCntrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { question, answer, difficulty, option1, option2, option3, code, addedBy, role } = req.body;
        const addedQuestion = yield (0, question_1.addQuestion)(QueRepository)(question, answer, option1, option2, option3, addedBy, role, difficulty, code);
        res.status(201).json({ addQuestion: question_1.addQuestion, status: true });
    }
    catch (error) {
    }
});
exports.addQuestionCntrl = addQuestionCntrl;
const getAllQuestionsCntrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = req.query.page;
        const empId = req.query.empId;
        const questions = yield (0, question_1.getQuestions)(QueRepository)(page, empId);
        const countdocuments = yield (0, question_1.getCount)(QueRepository)(empId);
        let pagecount = [];
        for (let i = 1; i <= Math.ceil(countdocuments / 10); i++) {
            pagecount.push(i);
        }
        res.json({ questions, pagecount });
    }
    catch (error) {
    }
});
exports.getAllQuestionsCntrl = getAllQuestionsCntrl;
const allQuestions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page } = req.params;
        console.log(page);
        const { questions, count } = yield (0, question_1.getAllQuestions)(QueRepository)(page);
        let pages = Math.ceil(count / 10);
        let pagination = [];
        for (let i = 1; i <= pages; i++) {
            pagination.push(i);
        }
        res.json({ questions, pagination });
    }
    catch (error) {
    }
});
exports.allQuestions = allQuestions;
const quesEnableCntrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { qId } = req.body;
        const data = yield (0, question_1.enableQueStatus)(QueRepository)(qId);
        res.json(data);
    }
    catch (error) {
    }
});
exports.quesEnableCntrl = quesEnableCntrl;
const quesDisbleCntrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { qId } = req.body;
        const data = yield (0, question_1.disableQueStatus)(QueRepository)(qId);
        res.json(data);
    }
    catch (error) {
    }
});
exports.quesDisbleCntrl = quesDisbleCntrl;
const QuestionEditCntrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { qId, question, answer, option1, option2, option3, difficulty, code } = req.body;
        const data = yield (0, question_1.updateQuestion)(QueRepository)(qId, question, answer, option1, option2, option3, difficulty, code);
        res.json({ status: true, data });
    }
    catch (error) {
    }
});
exports.QuestionEditCntrl = QuestionEditCntrl;
const getQuesrionByQId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = yield (0, question_1.getQuesrionById)(QueRepository)(id);
        res.json({ data });
    }
    catch (error) {
    }
});
exports.getQuesrionByQId = getQuesrionByQId;
