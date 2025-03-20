import TaskModel from '../models/task.model.js';
import UserModel from '../models/user.model.js';

export const addTask = async (req, res) => {
    const { userID, title, description, estTime, dueDate, priority } = req.body;

    try {
        const user = await UserModel.findById(userID); // Use `findById` for ObjectId lookup

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const task = new TaskModel({
            user_id: user._id, // Optional if you track user in the Task model
            title,
            description,
            estTime,
            dueDate,
            priority,
        });

        const savedTask = await task.save();

        // Push the task ID into user's `tasks` array
        user.task_id.push(savedTask._id);                          
        await user.save();
        res.status(200).json({ message: 'Task added successfully', task: savedTask });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error while saving the task' });
    }
};
