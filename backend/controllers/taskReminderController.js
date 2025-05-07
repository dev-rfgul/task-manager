// /backend/controllers/taskReminderController.js
import client from '../whatsapp.bot.js'; // Import the WhatsApp client

export const sendReminder = (req, res) => {
    const { userPhone, taskName, taskTime } = req.body;

    // Check if the WhatsApp client is ready before sending a message
    if (client) {
        const message = `⏰ Reminder: Your task "${taskName}" is due at ${taskTime}`;
        client.sendMessage(`${userPhone}@c.us`, message)
            .then(() => {
                res.status(200).send('Message sent successfully!');
            })
            .catch((err) => {
                res.status(500).send('Error sending message');
            });
    } else {
        res.status(500).send('WhatsApp client not ready');
    }
};

