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
exports.updateQueCntrl = exports.getmypublicanswers = exports.getmypublicquestions = exports.questionUnLike = exports.questionLike = exports.undoAnslikeCntrl = exports.answerlikeCntrl = exports.getPublicAnswersById = exports.editMyAns = exports.getMyAns = exports.ansPublicQuestion = exports.getPublicQuestion = exports.getPublicQuestions = exports.addPubilcQuestion = void 0;
const PublicQue_1 = require("../../app/usecases/PublicQue");
const PublicQueRepository_1 = require("../../infra/repositories/PublicQueRepository");
const PublicQuestionModel_1 = require("../../infra/Database/PublicQuestionModel");
const publicAns_1 = require("../../app/usecases/PublicAns/publicAns");
const PublicAnsRepository_1 = require("../../infra/repositories/PublicAnsRepository");
const PublicAnswer_1 = require("../../infra/Database/PublicAnswer");
const publicQuestionRepository = (0, PublicQueRepository_1.publicQuestionRepositoryImpl)(PublicQuestionModel_1.PublicQueModel);
const publicAnsRepository = (0, PublicAnsRepository_1.publicAnswerRepositoryImpl)(PublicAnswer_1.PublicAnsModel);
const addPubilcQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, language, question, code, userId } = req.body;
        const data = yield (0, PublicQue_1.askPublic)(publicQuestionRepository)(title, question, userId, language, code);
        res.json(data);
    }
    catch (error) {
        console.log(error);
    }
});
exports.addPubilcQuestion = addPubilcQuestion;
const getPublicQuestions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = req.query.page;
        const filter = req.query.filter;
        console.log(page, filter);
        const { questions, count, languages } = yield (0, PublicQue_1.getPQues)(publicQuestionRepository)(parseInt(page), filter);
        let pageArr = [];
        const pages = Math.ceil(count / 6);
        for (let i = 1; i <= pages; i++) {
            pageArr.push(i);
        }
        res.json({ questions, pageArr, languages });
    }
    catch (error) {
    }
});
exports.getPublicQuestions = getPublicQuestions;
const getPublicQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = yield (0, PublicQue_1.getPQueById)(publicQuestionRepository)(id);
        res.json(data);
    }
    catch (error) {
    }
});
exports.getPublicQuestion = getPublicQuestion;
const ansPublicQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { userId, answer, code } = req.body;
        const ans = yield (0, publicAns_1.ansPublic)(publicAnsRepository)(id, answer, userId, code);
        if (ans) {
            yield (0, PublicQue_1.addAnsUserId)(publicQuestionRepository)(id, userId);
        }
    }
    catch (error) {
    }
});
exports.ansPublicQuestion = ansPublicQuestion;
const getMyAns = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userId = req.query.userId;
        const data = yield (0, publicAns_1.GetmyAns)(publicAnsRepository)(id, userId);
        res.json(data);
    }
    catch (error) {
    }
});
exports.getMyAns = getMyAns;
const editMyAns = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ansId, answer, code } = req.body;
        const data = yield (0, publicAns_1.updateMyans)(publicAnsRepository)(ansId, answer, code);
        res.json(data);
    }
    catch (error) {
    }
});
exports.editMyAns = editMyAns;
const getPublicAnswersById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = yield (0, publicAns_1.getAnsByQid)(publicAnsRepository)(id);
        res.json(data);
    }
    catch (error) {
    }
});
exports.getPublicAnswersById = getPublicAnswersById;
const answerlikeCntrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ansId, userId } = req.body;
        const data = yield (0, publicAns_1.likeAnswer)(publicAnsRepository)(ansId, userId);
        res.json(data);
    }
    catch (error) {
    }
});
exports.answerlikeCntrl = answerlikeCntrl;
const undoAnslikeCntrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ansId, userId } = req.body;
        const data = yield (0, publicAns_1.undolikeAnswer)(publicAnsRepository)(ansId, userId);
        res.json(data);
    }
    catch (error) {
    }
});
exports.undoAnslikeCntrl = undoAnslikeCntrl;
const questionLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { qId, userId } = req.body;
        const data = yield (0, PublicQue_1.likeQuestionWithId)(publicQuestionRepository)(qId, userId);
        res.json(data);
    }
    catch (error) {
    }
});
exports.questionLike = questionLike;
const questionUnLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { qId, userId } = req.body;
        const data = yield (0, PublicQue_1.UnlikeQuestionWithId)(publicQuestionRepository)(qId, userId);
        res.json(data);
    }
    catch (error) {
    }
});
exports.questionUnLike = questionUnLike;
const getmypublicquestions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const questions = yield (0, PublicQue_1.getQueByUser)(publicQuestionRepository)(id);
        res.json(questions);
    }
    catch (error) {
    }
});
exports.getmypublicquestions = getmypublicquestions;
const getmypublicanswers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const answers = yield (0, publicAns_1.getAnsByUser)(publicAnsRepository)(id);
        res.json(answers);
    }
    catch (error) {
    }
});
exports.getmypublicanswers = getmypublicanswers;
const updateQueCntrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { qId, title, language, question, code } = req.body;
        const data = yield (0, PublicQue_1.updatePublicQuestion)(publicQuestionRepository)(qId, title, language, question, code);
        res.json(data);
    }
    catch (error) {
    }
});
exports.updateQueCntrl = updateQueCntrl;
