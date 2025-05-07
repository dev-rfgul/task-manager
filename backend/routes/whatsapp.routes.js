// /backend/server.js
import express from 'express';
import bodyParser from 'body-parser';
import { sendReminder } from '../controllers/taskReminderController.js';


const app = express();


// Route to trigger WhatsApp reminder
app.post('/send-reminder', sendReminder);


export default app;