import { Router } from "express";
import { getMessagesByChatId, sendMessage } from "../controllers/messageContollers";

const router=Router()

router.post('/send',sendMessage)
router.get('/:chatId',getMessagesByChatId)

export default router