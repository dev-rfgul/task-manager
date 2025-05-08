import TaskModel from '../models/task.model.js';
import UserModel from '../models/user.model.js';


export const getUserTasks = async (userID) => {
    try {
        // Fetch the user from the database
        const user = await UserModel.findById(userID);
        // console.log(user)
        if (!user) throw new Error("User not found");

        // Check if the user has tasks
        if (!user.task_id || user.task_id.length === 0) {
            return []; // No tasks
        }

        // Fetch tasks based on task_ids and completion status
        const tasks = await TaskModel.find({
            _id: { $in: user.task_id },
        });
        // console.log(tasks)

        return tasks;
    } catch (error) {
        // Handle error (e.g., log, or send a specific error message)
        console.error(error);
        throw error; // Re-throw or return a custom error response
    }
};

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
            estTime: newTask.estTime,  // Map estimatedTime to estTime
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
        const tasks = await getUserTasks(userID); // fetch tasks from DB
        console.log(tasks)
        // console.log(tasks)
        if (!tasks || tasks.length === 0) {
            return res.status(404).json({ message: "Can't find tasks for this user" });
        }
        res.status(200).json({ message: "Fetched tasks successfully", tasks });
    } catch (error) {
        return res.status(500).json({ message: "An error occurred while fetching taskss" });
    }
}

export const deleteTask = async (req, res) => {
    const taskID = req.params.id;
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

export const updateTask = async (req, res) => {
    const { taskID, updatedTask } = req.body;

    try {
        const task = await TaskModel.findByIdAndUpdate(
            taskID,
            {
                title: updatedTask.title,
                description: updatedTask.description,
                estTime: updatedTask.estTime,
                priority: updatedTask.priority,
                dueDate: updatedTask.dueDate,
            },
            { new: true } // optional: returns the updated document
        );

        if (!task) {
            return res.status(404).json({ message: "Can't find task" });
        }

        res.status(200).json({ message: "Task updated successfully", task });
    } catch (error) {
        res.status(500).json({ message: "An error occurred while updating the task", error });
    }
};

export const updateTaskStatus = async (req, res) => {
    const { taskID, completionStatus } = req.body;
    console.log(completionStatus)
    try {
        const task = await TaskModel.findById(taskID)
        console.log(task)
        if (!task) {
            return res.status(404).json({ message: "Task not found" })
        }
        task.completionStatus = completionStatus;
        await task.save();
        res.status(200).json({ message: "Task status updated successfully", task });
    } catch (error) {
        res.status(500).json({ message: "An error occurred while updating the task status", error });
    }
}