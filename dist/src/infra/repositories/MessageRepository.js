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
exports.MsgRepositoryEmpl = void 0;
const messageModal_1 = require("../Database/messageModal");
const mongoose_1 = __importDefault(require("mongoose"));
const chatModel_1 = require("../Database/chatModel");
const MsgRepositoryEmpl = (MessageModel) => {
    const sendMsg = (chatId, sender, content, isExam, isVideo) => __awaiter(void 0, void 0, void 0, function* () {
        const newChat = {
            sender: new mongoose_1.default.Types.ObjectId(sender),
            content,
            chat: new mongoose_1.default.Types.ObjectId(chatId),
            isExam,
            Exam: isExam ? new mongoose_1.default.Types.ObjectId(content) : undefined,
            isVideo
        };
        let message = yield messageModal_1.MsgModel.create(newChat);
        message = yield message.populate("sender", '_id firstname lastname username profileImg');
        message = yield message.populate('chat');
        message = yield message.populate('chat.users');
        message = yield message.populate('Exam');
        yield chatModel_1.chatModel.updateOne({ _id: new mongoose_1.default.Types.ObjectId(chatId) }, { $set: { latestMessage: message } });
        return message;
    });
    const getMsgsByChatId = (chatId) => __awaiter(void 0, void 0, void 0, function* () {
        const messags = yield MessageModel.find({ chat: new mongoose_1.default.Types.ObjectId(chatId) }).populate("sender", 'firstname lastname username profileImg').populate('Exam')
            .populate('chat');
        return messags;
    });
    return {
        sendMsg,
        getMsgsByChatId
    };
};
exports.MsgRepositoryEmpl = MsgRepositoryEmpl;
