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
exports.getMessagesByChatId = exports.sendMessage = void 0;
const Message_1 = require("../../app/usecases/Message/Message");
const MessageRepository_1 = require("../../infra/repositories/MessageRepository");
const messageModal_1 = require("../../infra/Database/messageModal");
const MsgRepository = (0, MessageRepository_1.MsgRepositoryEmpl)(messageModal_1.MsgModel);
const sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { content, chatId, senderId, isExam, isVideo } = req.body;
        const msg = yield (0, Message_1.sendingMessage)(MsgRepository)(chatId, senderId, content, isExam, isVideo);
        res.json({ msg });
    }
    catch (error) {
    }
});
exports.sendMessage = sendMessage;
const getMessagesByChatId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chatId = req.params.chatId;
        const messages = yield (0, Message_1.getAllMessages)(MsgRepository)(chatId);
        res.status(201).json({ messages });
    }
    catch (error) {
    }
});
exports.getMessagesByChatId = getMessagesByChatId;
