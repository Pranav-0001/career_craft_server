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
exports.getQuesrionById = exports.updateQuestion = exports.disableQueStatus = exports.enableQueStatus = exports.getAllQuestions = exports.getQuestionsByDiff = exports.getCount = exports.getQuestions = exports.addQuestion = void 0;
const addQuestion = (queModel) => (question, answer, option1, option2, option3, addedBy, role, difficulty, code) => {
    const options = shuffleArray([answer, option1, option2, option3]);
    const added = queModel.createQuestion(question, answer, options, difficulty, addedBy, role, code);
    return added;
};
exports.addQuestion = addQuestion;
const getQuestions = (queModel) => (page, empId) => __awaiter(void 0, void 0, void 0, function* () {
    const questions = yield queModel.getQuestions(page, empId);
    return questions;
});
exports.getQuestions = getQuestions;
const getCount = (queModel) => (empId) => __awaiter(void 0, void 0, void 0, function* () {
    const count = yield queModel.getCount(empId);
    return count;
});
exports.getCount = getCount;
const getQuestionsByDiff = (queModel) => (difficulty) => __awaiter(void 0, void 0, void 0, function* () {
    const questions = yield queModel.getQuestionsByDiff(difficulty);
    return questions;
});
exports.getQuestionsByDiff = getQuestionsByDiff;
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
const getAllQuestions = (queModel) => (page) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield queModel.getAllQuestions(page);
    return data;
});
exports.getAllQuestions = getAllQuestions;
const enableQueStatus = (queModel) => (qId) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield queModel.enableQue(qId);
    return data;
});
exports.enableQueStatus = enableQueStatus;
const disableQueStatus = (queModel) => (qId) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield queModel.disableQue(qId);
    return data;
});
exports.disableQueStatus = disableQueStatus;
const updateQuestion = (queModel) => (qId, question, answer, option1, option2, option3, difficulty, code) => __awaiter(void 0, void 0, void 0, function* () {
    const options = shuffleArray([answer, option1, option2, option3]);
    const data = yield queModel.questionEdit(qId, question, answer, options, difficulty, code);
    return data;
});
exports.updateQuestion = updateQuestion;
const getQuesrionById = (queModel) => (qId) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield queModel.getQuestion(qId);
    return data;
});
exports.getQuesrionById = getQuesrionById;
