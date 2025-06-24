import UserModel from '../models/user.model.js';
import TodoModel from '../models/task.model.js';




export const getAdminDashboard = async (req, res) => {
    try {
        // Fetch all users
        const users = await UserModel.find({}, '-password'); // Exclude password field
        const totalUsers = await UserModel.countDocuments();

        // Fetch all todos
        const todos = await TodoModel.find({});
        const totalTodos = await TodoModel.countDocuments();

        res.status(200).json({
            message: 'Admin dashboard data fetched successfully',
            data: {
                users,
                totalUsers,
                todos,
                totalTodos
            }
        });
    } catch (error) {
        console.error("Admin dashboard error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

