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
exports.CreateChatCntrlr = exports.fetchEmpChatsCntrlr = exports.acceptApplicationCntroller = void 0;
const applicationRepository_1 = require("../../infra/repositories/applicationRepository");
const chatRepository_1 = require("../../infra/repositories/chatRepository");
const chatModel_1 = require("../../infra/Database/chatModel");
const Chat_1 = require("../../app/usecases/Chat/Chat");
const applyModel_1 = require("../../infra/Database/applyModel");
const jobApplication_1 = require("../../app/usecases/user/jobApplication");
const applyRepository = (0, applicationRepository_1.applicationRepositoryEmpl)(applyModel_1.jobApplyModel);
const chatRepository = (0, chatRepository_1.chatRepositoryEmpl)(chatModel_1.chatModel);
const acceptApplicationCntroller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, empId, applicationId } = req.body;
        if (applicationId) {
            const updateStatus = yield (0, jobApplication_1.updateApplicationStatus)(applyRepository)(applicationId, "Accepted");
        }
        const accesChat = yield (0, Chat_1.createChat)(chatRepository)(empId, userId);
        res.json({ accesChat, update: true });
    }
    catch (error) {
    }
});
exports.acceptApplicationCntroller = acceptApplicationCntroller;
const fetchEmpChatsCntrlr = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const empId = req.params.empId;
        const allChats = yield (0, Chat_1.getChats)(chatRepository)(empId);
        res.status(202).json({ chats: allChats });
    }
    catch (error) {
    }
});
exports.fetchEmpChatsCntrlr = fetchEmpChatsCntrlr;
const CreateChatCntrlr = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, empId } = req.body;
        const accesChat = yield (0, Chat_1.createChat)(chatRepository)(empId, userId);
        res.json({ status: true });
    }
    catch (error) {
    }
});
exports.CreateChatCntrlr = CreateChatCntrlr;
