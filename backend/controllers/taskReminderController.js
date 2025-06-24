// this is the file responsible for sending task reminders to users via WhatsApp
// It fetches the tasks due for the current day and sends a reminder message to the user
// using the WhatsApp client.


// /backend/controllers/taskReminderController.js
import User from '../models/user.model.js'; // Import the User model
import Task from '../models/task.model.js'; // Import the Task model
import client from '../whatsapp.bot.js'; // Import the WhatsApp client

export const sendReminder = async(req, res) => {
    const user = await User.findOne({ whatsappNumber });
    if (!user) {
        throw new Error('User not found');
    }
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    const tasks = await Task.find({
        userId: user._id,
        dueDate: {
            $gte: startOfDay,
            $lt: endOfDay
        }
    });
    return tasks;
};

