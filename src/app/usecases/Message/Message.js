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
exports.getAllMessages = exports.sendingMessage = void 0;
const sendingMessage = (MessageRepository) => (chatId, senderId, content, isExam, isVideo) => __awaiter(void 0, void 0, void 0, function* () {
    const message = yield MessageRepository.sendMsg(chatId, senderId, content, isExam, isVideo);
    return message;
});
exports.sendingMessage = sendingMessage;
const getAllMessages = (MessageRepository) => (chatId) => __awaiter(void 0, void 0, void 0, function* () {
    const messages = yield MessageRepository.getMsgsByChatId(chatId);
    return messages;
});
exports.getAllMessages = getAllMessages;
