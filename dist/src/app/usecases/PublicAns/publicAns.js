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
exports.getMyLAS = exports.getAnsByUser = exports.undolikeAnswer = exports.likeAnswer = exports.getAnsByQid = exports.updateMyans = exports.GetmyAns = exports.ansPublic = void 0;
const ansPublic = (publicAnsRepository) => (Qid, answer, addedBy, code) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield publicAnsRepository.create(Qid, answer, addedBy, code);
    return data;
});
exports.ansPublic = ansPublic;
const GetmyAns = (publicAnsRepository) => (qId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield publicAnsRepository.getMyAns(qId, userId);
    return data;
});
exports.GetmyAns = GetmyAns;
const updateMyans = (publicAnsRepository) => (ansId, answer, code) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield publicAnsRepository.updateMyans(ansId, answer, code);
    return data;
});
exports.updateMyans = updateMyans;
const getAnsByQid = (publicAnsRepository) => (qId) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield publicAnsRepository.getAnsByQid(qId);
    return data;
});
exports.getAnsByQid = getAnsByQid;
const likeAnswer = (publicAnsRepository) => (ansId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield publicAnsRepository.likeAnswer(ansId, userId);
    return data;
});
exports.likeAnswer = likeAnswer;
const undolikeAnswer = (publicAnsRepository) => (ansId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield publicAnsRepository.undoLike(ansId, userId);
    return data;
});
exports.undolikeAnswer = undolikeAnswer;
const getAnsByUser = (publicAnsRepository) => (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield publicAnsRepository.getANswerByUser(userId);
    return data;
});
exports.getAnsByUser = getAnsByUser;
const getMyLAS = (publicAnsRepository) => (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield publicAnsRepository.getLASpoint(userId);
    return data;
});
exports.getMyLAS = getMyLAS;
