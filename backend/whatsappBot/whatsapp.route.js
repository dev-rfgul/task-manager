import express from 'express';

import { getTodaysTasks } from './whatsappBot.controller.js';

const router = express.Router();

router.get('/', getTodaysTasks);

export default router;