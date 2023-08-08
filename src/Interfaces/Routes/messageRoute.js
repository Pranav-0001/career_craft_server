"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const messageContollers_1 = require("../controllers/messageContollers");
const router = (0, express_1.Router)();
router.post('/send', messageContollers_1.sendMessage);
router.get('/:chatId', messageContollers_1.getMessagesByChatId);
exports.default = router;
