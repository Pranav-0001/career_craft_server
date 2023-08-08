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
exports.publicAnswerRepositoryImpl = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const publicAnswerRepositoryImpl = (PublicAnsModel) => {
    const create = (Qid, answer, userId, code) => __awaiter(void 0, void 0, void 0, function* () {
        const data = {
            questionId: new mongoose_1.default.Types.ObjectId(Qid),
            answer,
            addedBy: new mongoose_1.default.Types.ObjectId(userId),
            code,
            status: true
        };
        const res = yield PublicAnsModel.create(data);
        return res;
    });
    const getMyAns = (qId, userId) => __awaiter(void 0, void 0, void 0, function* () {
        const que = new mongoose_1.default.Types.ObjectId(qId);
        const user = new mongoose_1.default.Types.ObjectId(userId);
        console.log({ que, user });
        const data = yield PublicAnsModel.findOne({ questionId: que, addedBy: user }).populate('addedBy');
        return data;
    });
    const updateMyans = (ansId, answer, code) => __awaiter(void 0, void 0, void 0, function* () {
        const ans = new mongoose_1.default.Types.ObjectId(ansId);
        const data = yield PublicAnsModel.updateOne({ _id: ans }, { $set: { answer: answer, code: code } });
        return data;
    });
    const getAnsByQid = (qId) => __awaiter(void 0, void 0, void 0, function* () {
        const que = new mongoose_1.default.Types.ObjectId(qId);
        const data = yield PublicAnsModel.find({ questionId: que }).sort({ likes: -1 }).populate('addedBy');
        return data;
    });
    const likeAnswer = (ansId, userId) => __awaiter(void 0, void 0, void 0, function* () {
        const ans = new mongoose_1.default.Types.ObjectId(ansId);
        const data = yield PublicAnsModel.updateOne({ _id: ans }, { $push: { likedBy: userId }, $inc: { likes: 1 } });
        console.log(data);
        return data;
    });
    const undoLike = (ansId, userId) => __awaiter(void 0, void 0, void 0, function* () {
        const ans = new mongoose_1.default.Types.ObjectId(ansId);
        const data = yield PublicAnsModel.updateOne({ _id: ans }, { $pull: { likedBy: userId }, $inc: { likes: -1 } });
        return data;
    });
    const getANswerByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const user = new mongoose_1.default.Types.ObjectId(userId);
        const res = yield PublicAnsModel.find({ addedBy: user }).populate('questionId');
        return res;
    });
    const getLASpoint = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const id = new mongoose_1.default.Types.ObjectId(userId);
        const res = yield PublicAnsModel.aggregate([
            {
                $match: {
                    addedBy: id
                }
            },
            {
                $group: {
                    _id: null,
                    totalMarks: { $sum: "$likes" }
                }
            }
        ]);
        return res;
    });
    return {
        create,
        getMyAns,
        updateMyans,
        getAnsByQid,
        likeAnswer,
        undoLike,
        getANswerByUser,
        getLASpoint
    };
};
exports.publicAnswerRepositoryImpl = publicAnswerRepositoryImpl;
