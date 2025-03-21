import TaskModel from '../models/task.model.js';
import UserModel from '../models/user.model.js';

export const addTask = async (req, res) => {
    const { userID, newTask } = req.body;

    try {
        const user = await UserModel.findById(userID); // Use `findById` for ObjectId lookup

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const task = new TaskModel({
            user_id: user._id,
            title: newTask.title,
            description: newTask.description,
            estTime: newTask.estimatedTime,  // Map estimatedTime to estTime
            dueDate: newTask.dueDate,
            priority: newTask.priority
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

export const getAllTasks = async (req, res) => {
    const userID = req.params.id;
    // console.log(userID)
    try {
        // First, find the user to get their task_id array
        const user = await UserModel.findById(userID);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // If the user has no tasks
        if (!user.task_id || user.task_id.length === 0) {
            return res.status(404).json({ message: "No tasks found for this user" });
        }

        // Then, fetch all tasks that match the IDs in the task_id array
        const tasks = await TaskModel.find({ _id: { $in: user.task_id } });

        if (!tasks || tasks.length === 0) {
            return res.status(404).json({ message: "Can't find tasks for this user" });
        }

        return res.status(200).json({ message: "Fetched tasks successfully", tasks });

    } catch (error) {
        console.error(error); // Log the actual error for debugging
        return res.status(500).json({ message: "An error occurred while fetching tasks" });
    }
}

export const deleteTask= async (req, res) => {
    const taskID  = req.params.id;
    try {
        const task = await TaskModel.findByIdAndDelete(taskID); // pass the ID directly

        if (!task) {
            return res.status(404).json({ message: "This task does not exist" });
        }

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "An error occurred", error });
    }
};
