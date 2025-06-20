// import User from '../models/user.model.js';
// import Task from '../models/task.model.js';

// export const getTodaysTasks = async (whatsappNumber) => {
//     console.log('Fetching tasks for WhatsApp number:', whatsappNumber);

//     if (!whatsappNumber) {
//         throw new Error('WhatsApp number is required');
//     }
//     const user = await User.findOne({ whatsappNumber });
//     if (!user) {
//         throw new Error('User not found');
//     }
//     try {
//         const tasks = await getUserTasks(userID); // fetch tasks from DB
//         if (!tasks || tasks.length === 0) {
//             return res.status(404).json({ message: "Can't find tasks for this user" });
//         }
//         // Filter tasks for today
//         const today = new Date();
//         const todayTasks = tasks.filter(task => {
//             const dueDate = new Date(task.dueDate);
//             return dueDate.getFullYear() === today.getFullYear() &&
//                 dueDate.getMonth() === today.getMonth() &&
//                 dueDate.getDate() === today.getDate();
//         });
//         res.status(200).json({ message: "Fetched today's tasks successfully", tasks: todayTasks });
//     } catch (error) {
//         return res.status(500).json({ message: "An error occurred while fetching today's tasks" });
//     }
//     return tasks;

// }

// export const sendReminder = async () => {

// }



import User from '../models/user.model.js';
import Task from '../models/task.model.js';
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
                dueDate.getDate() === today.getDate();
        });
        return ({ message: "Fetched today's tasks successfully", tasks: todayTasks });
    } catch (error) {
        return ({ message: "An error occurred while fetching today's tasks" });
    }
};
