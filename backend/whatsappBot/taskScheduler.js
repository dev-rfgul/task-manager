import cron from 'node-cron';
import { sendReminderForAllUsers } from '../whatsappBot/whatsappBot.controller.js';

cron.schedule('*/10 * * * * *', () => {
    console.log('Running task every 10 seconds');
    sendReminderForAllUsers();
}, {
    scheduled: true,
    timezone: "America/New_York" // Adjust to your timezone
});