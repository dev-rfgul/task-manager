
import cron from 'node-cron';
import User from '../models/user.model.js';
import { getUserTasks } from '../controllers/task.controller.js';


export const getTodaysTasks = async (whatsappNumber) => {
    console.log('Fetching tasks for WhatsApp number:', whatsappNumber);

    if (!whatsappNumber) {
        throw new Error('WhatsApp number is required');
    }

    const user = await User.findOne({ whatsappNumber });
    if (!user) {
        throw new Error('User not found');
    }
    console.log('User found:', user);
    try {
        const tasks = await getUserTasks(user._id); // fetch tasks from DB
        if (!tasks || tasks.length === 0) {
            return ({ message: "Can't find tasks for this user" });
        }
        // Filter tasks for today
        const today = new Date();
        const todayTasks = tasks.filter(task => {
            const dueDate = new Date(task.dueDate);
            return dueDate.getFullYear() === today.getFullYear() &&
                dueDate.getMonth() === today.getMonth() &&
                dueDate.getDate() === today.getDate() && task.completionStatus === 'Pending';
        });
        return ({ message: "Fetched today's tasks successfully", todaysTasks: todayTasks });
    } catch (error) {
        return ({ message: "An error occurred while fetching today's tasks" });
    }
};

export const getTomrrowsTasks = async (whatsappNumber) => {
    console.log('Fetching tasks for WhatsApp number:', whatsappNumber);

    if (!whatsappNumber) {
        throw new Error('WhatsApp number is required');
    }

    const user = await User.findOne({ whatsappNumber });
    if (!user) {
        throw new Error('User not found');
    }
    console.log('User found:', user);
    try {
        const tasks = await getUserTasks(user._id); // fetch tasks from DB
        if (!tasks || tasks.length === 0) {
            return res.status(404).json({ message: "Can't find tasks for this user" });
        }
        // Filter tasks for tomorrow
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowTasks = tasks.filter(task => {
            const dueDate = new Date(task.dueDate);
            return dueDate.getFullYear() === tomorrow.getFullYear() &&
                dueDate.getMonth() === tomorrow.getMonth() &&
                dueDate.getDate() === tomorrow.getDate() && task.completionStatus === 'Pending';
        });
        return ({ message: "Fetched tomorrow's tasks successfully", tomorrowsTasks: tomorrowTasks });
    } catch (error) {
        return ({ message: "An error occurred while fetching tomorrow's tasks" });
    }
};

export const getUpcomingTasks = async (whatsappNumber) => {
    console.log('Fetching tasks for WhatsApp number:', whatsappNumber);

    if (!whatsappNumber) {
        throw new Error('WhatsApp number is required');
    }

    const user = await User.findOne({ whatsappNumber });
    if (!user) {
        throw new Error('User not found');
    }
    console.log('User found:', user);
    try {
        const tasks = await getUserTasks(user._id); // fetch tasks from DB
        if (!tasks || tasks.length === 0) {
            return res.status(404).json({ message: "Can't find tasks for this user" });
        }

        const today = new Date();
        const dayAfterTomorrow = new Date(today);
        dayAfterTomorrow.setDate(today.getDate() + 2);
        dayAfterTomorrow.setHours(0, 0, 0, 0); // Start of day after tomorrow

        const upcomingTasks = tasks.filter(task => {
            const dueDate = new Date(task.dueDate);
            return dueDate >= dayAfterTomorrow;
        });

        return ({ message: "Fetched tasks for the day after tomorrow and ahead successfully", upcomingTasks: upcomingTasks });
    } catch (error) {
        return ({ message: "An error occurred while fetching tasks" });
    }
}

export const getAllTasks = async (whatsappNumber) => {
    console.log('Fetching all tasks for WhatsApp number:', whatsappNumber);

    if (!whatsappNumber) {
        throw new Error('WhatsApp number is required');
    }

    const user = await User.findOne({ whatsappNumber });
    if (!user) {
        throw new Error('User not found');
    }
    console.log('User found:', user);

    try {
        const tasks = await getUserTasks(user._id); // fetch tasks from DB
        if (!tasks || tasks.length === 0) {
            return { message: "Can't find tasks for this user" };
        }

        const allTasks = tasks.filter(task => task.completionStatus === 'Pending');
        if (allTasks.length === 0) {
            return { message: "No pending tasks found for this user" };
        }

        console.log('All tasks fetched successfully:', allTasks);
        return { message: "Fetched all tasks successfully", allTasks: allTasks };
    } catch (error) {
        console.error('Error while fetching tasks:', error);
        return { message: "An error occurred while fetching all tasks" };
    }
};


//will automatically send reminders to all users who have tasks due today

export const sendReminderForAllUsers = async () => {
    try {
        const users = await User.find({});
        const reminders = [];

        for (const user of users) {
            const { todaysTasks } = await getTodaysTasks(user.whatsappNumber);

            if (todaysTasks && todaysTasks.length > 0) {
                const taskList = todaysTasks.map(task =>
                    `• ${task.title} (Due: ${new Date(task.dueDate).toLocaleTimeString()})`
                ).join('\n');

                const message = `🔔 Reminder: You have ${todaysTasks.length} task(s) due today:\n\n${taskList}`;

                // Push to reminders array
                reminders.push({
                    number: user.whatsappNumber,
                    message
                });
            }
        }

        return reminders; // array of all reminders
    } catch (err) {
        console.error('❌ Error in sending reminders:', err);
        return [];
    }
};




