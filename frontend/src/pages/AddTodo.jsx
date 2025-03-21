
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddTodo = ({ taskToEdit }) => {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user")) || null;
    const userID = user?.user.id
    console.log(userID)

    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        estTime: '',
        priority: 'Low',
        dueDate: ''
    });
    useEffect(() => {
        if (taskToEdit) {
            setNewTask(taskToEdit)
        }
    }, [taskToEdit])

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setNewTask((prevTask) => ({
            ...prevTask,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!newTask.title.trim()) {
            alert('Task title is required');
            return;
        }
        console.log(newTask)
        try {
            if (taskToEdit) {
                try {
                    const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/task/updateTask`, {
                        taskID: taskToEdit._id,
                        updatedTask: newTask,
                    })
                    if (response.status===200) {
                        console.log("task updated successfully")
                    }
                } catch (error) {
                    console.error("an error occured while updating task",error)
                }
            }
            else {
                try {
                    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/task/addTask`, {
                        userID,
                        newTask
                    });
                    if (response.status === 200) {
                        console.log("Task added successfully");
                        setNewTask({
                            title: '',
                            description: '',
                            estTime: '',
                            priority: 'Low',
                            dueDate: ''
                        });
                        // Optional: Refresh tasks or navigate
                        // navigate('/dashboard')
                    } else {
                        console.log("Can't add task, server returned:", response.status);
                    }
                } catch (error) {
                    console.log("an error occured while adding the task")
                }
            }
        } catch (error) {
            console.error('An error occurred while adding  or updating task:', error);
        }
    };

    return (
        <div className=" border border-gray-700   flex items-center justify-center px-4">
            <div className="w-full max-w-2xl bg-white/60 backdrop-blur-md shadow-xl rounded-2xl p-8 md:p-10 transition-all duration-300">
                <h1 className="text-3xl font-bold text-indigo-700 text-center mb-6">📝 Add New Task</h1>
                <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-gray-800 font-medium mb-1">
                            Task Title
                        </label>
                        <input
                            id="title"
                            type="text"
                            value={newTask.title}
                            onChange={handleInputChange}
                            placeholder="e.g. Finish React project"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-gray-800 font-medium mb-1">
                            Description
                        </label>
                        <textarea
                            id="description"
                            rows="3"
                            value={newTask.description}
                            onChange={handleInputChange}
                            placeholder="Details about the task..."
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="estTime" className="block text-gray-800 font-medium mb-1">
                                Est. Time (minutes)
                            </label>
                            <input
                                id="estTime"
                                type="number"
                                value={newTask.estTime}
                                onChange={handleInputChange}
                                placeholder="e.g. 45"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                        </div>
                        <div>
                            <label htmlFor="priority" className="block text-gray-800 font-medium mb-1">
                                Priority
                            </label>
                            <select
                                id="priority"
                                value={newTask.priority}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                            >
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                                <option>Urgent</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="dueDate" className="block text-gray-800 font-medium mb-1">
                            Due Date
                        </label>
                        <input
                            id="dueDate"
                            type="datetime-local"
                            value={newTask.dueDate}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                    </div>

                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-300 flex items-center justify-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 010 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 010-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        {taskToEdit ? "Update Task" : "Add Task"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddTodo;
