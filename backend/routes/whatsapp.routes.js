// /backend/server.js
import express from 'express';
import bodyParser from 'body-parser';
import { sendReminder } from '../controllers/taskReminderController.js';


const router= express.Router();


// Route to trigger WhatsApp reminder
router.post('/send-reminder', sendReminder);


export default router;