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
exports.updatePublicQuestion = exports.getQueByUser = exports.UnlikeQuestionWithId = exports.likeQuestionWithId = exports.addAnsUserId = exports.getPQueById = exports.getPQues = exports.askPublic = void 0;
const askPublic = (publicQuestionRepository) => (title, question, addedBy, language, code) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield publicQuestionRepository.createQuestion(title, question, addedBy, language, code);
    return data;
});
exports.askPublic = askPublic;
const getPQues = (publicQuestionRepository) => (page, filter) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield publicQuestionRepository.getPublicQuestions(page, filter);
    return data;
});
exports.getPQues = getPQues;
const getPQueById = (publicQuestionRepository) => (id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield publicQuestionRepository.getPublicQuestionById(id);
    return data;
});
exports.getPQueById = getPQueById;
const addAnsUserId = (publicQuestionRepository) => (qId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield publicQuestionRepository.updateAnsArray(qId, userId);
    return data;
});
exports.addAnsUserId = addAnsUserId;
const likeQuestionWithId = (publicQuestionRepository) => (qId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield publicQuestionRepository.likeQuestion(qId, userId);
    return data;
});
exports.likeQuestionWithId = likeQuestionWithId;
const UnlikeQuestionWithId = (publicQuestionRepository) => (qId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield publicQuestionRepository.UnlikeQuestion(qId, userId);
    return data;
});
exports.UnlikeQuestionWithId = UnlikeQuestionWithId;
const getQueByUser = (publicQuestionRepository) => (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield publicQuestionRepository.getQuestionByUser(userId);
    return data;
});
exports.getQueByUser = getQueByUser;
const updatePublicQuestion = (publicQuestionRepository) => (qId, title, language, question, code) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield publicQuestionRepository.updateQue(qId, title, language, question, code);
    return data;
});
exports.updatePublicQuestion = updatePublicQuestion;
