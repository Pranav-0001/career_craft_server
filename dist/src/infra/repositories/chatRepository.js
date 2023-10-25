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
exports.chatRepositoryEmpl = void 0;
const chatModel_1 = require("../Database/chatModel");
const mongoose_1 = __importDefault(require("mongoose"));
const chatRepositoryEmpl = (chatsModel) => {
    const createChat = (empId, candidateId) => __awaiter(void 0, void 0, void 0, function* () {
        const emp = new mongoose_1.default.Types.ObjectId(empId);
        const candidate = new mongoose_1.default.Types.ObjectId(candidateId);
        const isChat = yield chatModel_1.chatModel.findOne({
            $and: [
                { users: { $elemMatch: { $eq: emp } } },
                { users: { $elemMatch: { $eq: candidate } } }
            ]
        }).populate('users', '-password').populate('latestMessage');
        if (isChat) {
            return isChat;
        }
        else {
            const chatData = {
                chatName: 'sender',
                users: [emp, candidate],
            };
            const createdChat = yield chatModel_1.chatModel.create(chatData);
            const fullChat = yield chatModel_1.chatModel.findOne({ _id: createdChat._id }).populate('users', '-password');
            return fullChat;
        }
    });
    const getAllChats = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const id = new mongoose_1.default.Types.ObjectId(userId);
        const chats = chatModel_1.chatModel.find({ users: { $elemMatch: { $eq: id } } }).populate('users', '-password').populate('latestMessage').sort({ updatedAt: -1 });
        return chats;
    });
    const getChatCount = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const id = new mongoose_1.default.Types.ObjectId(userId);
        const num = yield chatModel_1.chatModel.aggregate([{
                $unwind: "$users"
            }, {
                $match: {
                    users: id
                }
            },
            {
                $group: {
                    _id: null,
                    count: { $sum: 1 }
                }
            }
        ]);
        return num;
    });
    return {
        createChat,
        getAllChats,
        getChatCount
    };
};
exports.chatRepositoryEmpl = chatRepositoryEmpl;
