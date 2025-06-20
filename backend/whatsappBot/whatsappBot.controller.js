import User from '../models/User.js';
import Task from '../models/Task.js';

export const getTodaysTasks = async (whatsappNumber) => {
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

}

export const sendReminder = async () => {

}

