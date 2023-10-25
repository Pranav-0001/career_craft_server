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
exports.publicQuestionRepositoryImpl = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const publicQuestionRepositoryImpl = (PublicQueModel) => {
    const createQuestion = (title, question, addedBy, language, code) => __awaiter(void 0, void 0, void 0, function* () {
        const Que = {
            title,
            question,
            addedBy: new mongoose_1.default.Types.ObjectId(addedBy),
            language: language.toLowerCase(),
            code
        };
        const data = yield PublicQueModel.create(Que);
        return data;
    });
    const getPublicQuestions = (page, filter) => __awaiter(void 0, void 0, void 0, function* () {
        const skip = (page - 1) * 6;
        const languages = yield PublicQueModel.distinct('language');
        if (filter) {
            const filterRegex = new RegExp(filter, 'i');
            const questions = yield PublicQueModel.find({ language: filterRegex }).sort({ likes: -1 }).skip(skip).limit(6);
            const count = yield PublicQueModel.countDocuments({ language: filterRegex });
            return { questions, count, languages };
        }
        else {
            const questions = yield PublicQueModel.find().sort({ likes: -1 }).skip(skip).limit(6);
            const count = yield PublicQueModel.countDocuments();
            return { questions, count, languages };
        }
    });
    const getPublicQuestionById = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const qId = new mongoose_1.default.Types.ObjectId(id);
        const question = yield PublicQueModel.findOne({ _id: qId }).populate('addedBy');
        return question;
    });
    const updateAnsArray = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
        const qId = new mongoose_1.default.Types.ObjectId(id);
        const res = yield PublicQueModel.updateOne({ _id: qId }, { $push: { answeredBy: new mongoose_1.default.Types.ObjectId(userId) } });
        return res;
    });
    const likeQuestion = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
        const qId = new mongoose_1.default.Types.ObjectId(id);
        const res = yield PublicQueModel.updateOne({ _id: qId }, { $push: { likedBy: userId }, $inc: { likes: 1 } });
        return res;
    });
    const UnlikeQuestion = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
        const qId = new mongoose_1.default.Types.ObjectId(id);
        const res = yield PublicQueModel.updateOne({ _id: qId }, { $pull: { likedBy: userId }, $inc: { likes: -1 } });
        return res;
    });
    const getQuestionByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const user = new mongoose_1.default.Types.ObjectId(userId);
        const res = yield PublicQueModel.find({ addedBy: user });
        return res;
    });
    const updateQue = (id, title, language, question, code) => __awaiter(void 0, void 0, void 0, function* () {
        const qId = new mongoose_1.default.Types.ObjectId(id);
        const res = yield PublicQueModel.updateOne({ _id: qId }, { $set: { title: title, language: language, question: question, code: code } });
        return res;
    });
    return {
        createQuestion,
        getPublicQuestions,
        getPublicQuestionById,
        updateAnsArray,
        likeQuestion,
        UnlikeQuestion,
        getQuestionByUser,
        updateQue
    };
};
exports.publicQuestionRepositoryImpl = publicQuestionRepositoryImpl;
