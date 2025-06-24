import { Link } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {
    User,
    Calendar,
    Clock,
    CheckCircle,
    TrendingUp,
    Target,
    Award,
    BarChart3
} from 'lucide-react';

const ProfileDashboard = () => {
    const user = JSON.parse(localStorage.getItem("user")) || null;
    const token = localStorage.getItem("token"); // Get token separately
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getUserData = async () => {
            // Use either user.token or separate token
            const authToken = user?.token || token;

            if (!user?.id || !authToken) {
                setError(`User authentication data is missing. User ID: ${user?.id}, Token: ${authToken ? 'exists' : 'missing'}`);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/user/${user.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        },
                    }
                );
                setUserData(response.data);
                console.log("User Data:", response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setError("Failed to fetch user data");
            } finally {
                setLoading(false);
            }
        };

        getUserData();
    }, [user?.id, user?.token, token]);

    // Show loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-white p-6 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    // Show error state
    if (error || !userData) {
        return (
            <div className="min-h-screen bg-white p-6 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">{error || "No user data available"}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    // Safely access tasks with fallback - API returns task_id instead of tasks
    const tasks = userData?.task_id || [];

    // Calculate statistics
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completionStatus === 'Completed').length;
    const pendingTasks = tasks.filter(task => task.completionStatus === 'Pending').length;
    const overdueTasks = tasks.filter(task => task.completionStatus === 'Overdue').length;
    const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    // Calculate time statistics
    const totalEstimatedTime = tasks.reduce((sum, task) => sum + (task.estTime || 0), 0);
    const completedTime = tasks
        .filter(task => task.completionStatus === 'Completed')
        .reduce((sum, task) => sum + (task.estTime || 0), 0);

    // Calculate daily progress (tasks completed today)
    const today = new Date().toISOString().split('T')[0];
    const dailyCompleted = tasks.filter(task =>
        task.completionStatus === 'Completed' &&
        task.updatedAt?.split('T')[0] === today
    ).length;

    // Calculate weekly progress (last 7 days)
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weeklyCompleted = tasks.filter(task =>
        task.completionStatus === 'Completed' &&
        task.updatedAt &&
        new Date(task.updatedAt) >= weekAgo
    ).length;

    // Calculate monthly progress (last 30 days)
    const monthAgo = new Date();
    monthAgo.setDate(monthAgo.getDate() - 30);
    const monthlyCompleted = tasks.filter(task =>
        task.completionStatus === 'Completed' &&
        task.updatedAt &&
        new Date(task.updatedAt) >= monthAgo
    ).length;

    // Priority distribution
    const priorityStats = {
        Urgent: tasks.filter(task => task.priority === 'Urgent').length,
        High: tasks.filter(task => task.priority === 'High').length,
        Medium: tasks.filter(task => task.priority === 'Medium').length,
        Low: tasks.filter(task => task.priority === 'Low').length,
    };

    const memberSince = userData.createdAt
        ? new Date(userData.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
        : 'Unknown';

    // Calculate time completion percentage safely
    const timeCompletionPercentage = totalEstimatedTime > 0
        ? Math.round((completedTime / totalEstimatedTime) * 100)
        : 0;

    const sendWhatsappMsg = async () => {
        alert("Do not change this message, it is used to link your WhatsApp with the app . By clicking Ok you agree to our terms and conditions.");
        const message = `secret code: ${userData._id}`;
        window.open(
            `https://wa.me/923329296026?text=${encodeURIComponent(message)}`,
            "_blank"
        );
    }
    return (
        <div className="min-h-screen bg-white p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="bg-white border border-gray-300 rounded-2xl shadow-md p-6 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        {/* User Info */}
                        <div className="flex items-start md:items-center gap-4 flex-1">
                            <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center shadow">
                                <User className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-semibold text-gray-900">{userData.name || 'Unknown User'}</h1>
                                <p className="text-gray-600">{userData.email || 'No email provided'}</p>
                                <p className="text-sm text-gray-500">Member since {memberSince}</p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                            <Link
                                to="/add-todo"
                                className="px-4 py-2 text-sm text-center font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200 shadow"
                            >
                                Add Task
                            </Link>

                            {userData.whatsappNumber && (
                                <button
                                    onClick={sendWhatsappMsg}
                                    className="flex items-center justify-center w-10 h-10 bg-green-500 hover:bg-green-600 text-white rounded-full transition"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 32 32">
                                        <path d="M16 0C7.164 0 0 6.99 0 15.615c0 2.757.763 5.34 2.073 7.591L0 32l8.005-2.094A15.964 15.964 0 0016 31.23c8.836 0 16-6.99 16-15.615C32 6.99 24.836 0 16 0zm0 28.615c-2.545 0-4.946-.688-7.01-1.896l-.502-.296-4.755 1.244 1.266-4.63-.327-.475a12.892 12.892 0 01-2.045-7.047c0-7.13 5.943-12.93 13.333-12.93S29.333 8.486 29.333 15.615 23.39 28.615 16 28.615z" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>
                </div>


                {/* Progress Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <div className="bg-white border border-gray-700 rounded-lg shadow-sm p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Daily Progress</p>
                                <p className="text-2xl font-bold text-indigo-600">{dailyCompleted}</p>
                                <p className="text-xs text-gray-500">tasks completed today</p>
                            </div>
                            <Calendar className="w-8 h-8 text-indigo-600" />
                        </div>
                    </div>

                    <div className="bg-white border border-gray-700 rounded-lg shadow-sm p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Weekly Progress</p>
                                <p className="text-2xl font-bold text-indigo-600">{weeklyCompleted}</p>
                                <p className="text-xs text-gray-500">tasks completed this week</p>
                            </div>
                            <TrendingUp className="w-8 h-8 text-indigo-600" />
                        </div>
                    </div>

                    <div className="bg-white border border-gray-700 rounded-lg shadow-sm p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Monthly Progress</p>
                                <p className="text-2xl font-bold text-indigo-600">{monthlyCompleted}</p>
                                <p className="text-xs text-gray-500">tasks completed this month</p>
                            </div>
                            <BarChart3 className="w-8 h-8 text-indigo-600" />
                        </div>
                    </div>

                    <div className="bg-white border border-gray-700 rounded-lg shadow-sm p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                                <p className="text-2xl font-bold text-indigo-600">{completionPercentage}%</p>
                                <p className="text-xs text-gray-500">overall completion</p>
                            </div>
                            <Target className="w-8 h-8 text-indigo-600" />
                        </div>
                    </div>
                </div>

                {/* Main Stats Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Task Overview */}
                    <div className="bg-white border border-gray-700 rounded-lg shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <CheckCircle className="w-5 h-5 text-indigo-600 mr-2" />
                            Task Overview
                        </h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Total Tasks</span>
                                <span className="font-semibold text-gray-900">{totalTasks}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Completed</span>
                                <span className="font-semibold text-green-600">{completedTasks}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Pending</span>
                                <span className="font-semibold text-yellow-600">{pendingTasks}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Overdue</span>
                                <span className="font-semibold text-red-600">{overdueTasks}</span>
                            </div>
                            <div className="pt-4 border-t">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-gray-600">Completion Progress</span>
                                    <span className="font-semibold text-indigo-600">{completionPercentage}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${completionPercentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Priority Distribution */}
                    <div className="bg-white border border-gray-700 rounded-lg shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <Award className="w-5 h-5 text-indigo-600 mr-2" />
                            Priority Distribution
                        </h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                                    <span className="text-gray-600">Urgent</span>
                                </div>
                                <span className="font-semibold text-gray-900">{priorityStats.Urgent}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                                    <span className="text-gray-600">High</span>
                                </div>
                                <span className="font-semibold text-gray-900">{priorityStats.High}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                                    <span className="text-gray-600">Medium</span>
                                </div>
                                <span className="font-semibold text-gray-900">{priorityStats.Medium}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                                    <span className="text-gray-600">Low</span>
                                </div>
                                <span className="font-semibold text-gray-900">{priorityStats.Low}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Time Statistics */}
                <div className="bg-white border border-gray-700 rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Clock className="w-5 h-5 text-indigo-600 mr-2" />
                        Time Statistics
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-indigo-600">{totalEstimatedTime}</p>
                            <p className="text-sm text-gray-600">Total Estimated Hours</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-green-600">{completedTime}</p>
                            <p className="text-sm text-gray-600">Completed Hours</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-yellow-600">{totalEstimatedTime - completedTime}</p>
                            <p className="text-sm text-gray-600">Remaining Hours</p>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-600">Time Completion</span>
                            <span className="font-semibold text-indigo-600">{timeCompletionPercentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${timeCompletionPercentage}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileDashboard;