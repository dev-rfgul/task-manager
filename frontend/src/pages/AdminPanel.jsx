import React, { useState, useMemo } from 'react';
import axios from 'axios';
import { Users, UserCheck, UserX, Activity, TrendingUp, Calendar, Phone, Mail, Crown, Shield } from 'lucide-react';
import { useEffect } from 'react';

const Dashboard = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // const token = localStorage.getItem('token');
    // console.log('Token:', token);
    const getDashboardData = async () => {
        try {
            const token = localStorage.getItem('token'); // Get token from localStorage

            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/dashboard`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // Axios automatically parses JSON response
            return response.data;

        } catch (err) {
            console.error('Error fetching dashboard data:', err);
            throw err;
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const userData = await getDashboardData();
                setUsers(userData.data.users);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    // Calculate comprehensive analytics
    const analytics = useMemo(() => {
        const totalUsers = users.length;
        const totalTasks = users.reduce((sum, user) => sum + (user.task_id?.length || 0), 0);
        const activeUsers = users.filter(user => (user.task_id?.length || 0) > 0).length;
        const avgTasksPerUser = totalUsers > 0 ? (totalTasks / totalUsers).toFixed(1) : 0;

        // Role distribution
        const roleStats = users.reduce((acc, user) => {
            acc[user.role] = (acc[user.role] || 0) + 1;
            return acc;
        }, {});

        // Activity distribution
        const activityStats = users.map(user => {
            const taskCount = user.task_id?.length || 0;
            const productivity = totalTasks > 0 ? ((taskCount / totalTasks) * 100).toFixed(1) : 0;
            return {
                ...user,
                taskCount,
                productivity: parseFloat(productivity)
            };
        }).sort((a, b) => b.taskCount - a.taskCount);

        // Rate limit analysis
        const rateLimitStats = users.map(user => ({
            name: user.name,
            rateLimitCount: user.rateLimit?.count || 0,
            lastReset: user.rateLimit?.lastReset
        }));

        // Date analysis
        const registrationDates = users.map(user => new Date(user.createdAt).toDateString());
        const uniqueDates = [...new Set(registrationDates)];

        return {
            totalUsers,
            totalTasks,
            activeUsers,
            avgTasksPerUser,
            roleStats,
            activityStats,
            rateLimitStats,
            uniqueRegistrationDates: uniqueDates.length
        };
    }, [users]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getRoleIcon = (role) => {
        switch (role) {
            case 'admin': return <Crown className="w-4 h-4 text-yellow-500" />;
            case 'user': return <Shield className="w-4 h-4 text-blue-500" />;
            case 'guest': return <UserCheck className="w-4 h-4 text-gray-500" />;
            default: return <Users className="w-4 h-4" />;
        }
    };

    const getProductivityColor = (productivity) => {
        if (productivity >= 15) return 'text-green-600 bg-green-100';
        if (productivity >= 5) return 'text-yellow-600 bg-yellow-100';
        return 'text-red-600 bg-red-100';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">TaskAI Studio Dashboard</h1>
                    <p className="text-slate-300">Comprehensive analytics and user management</p>
                </div>

                {/* Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-300 text-sm">Total Users</p>
                                <p className="text-3xl font-bold text-white">{analytics.totalUsers}</p>
                            </div>
                            <Users className="w-8 h-8 text-blue-400" />
                        </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-300 text-sm">Total Tasks</p>
                                <p className="text-3xl font-bold text-white">{analytics.totalTasks}</p>
                            </div>
                            <Activity className="w-8 h-8 text-green-400" />
                        </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-300 text-sm">Active Users</p>
                                <p className="text-3xl font-bold text-white">{analytics.activeUsers}</p>
                            </div>
                            <UserCheck className="w-8 h-8 text-purple-400" />
                        </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-300 text-sm">Avg Tasks/User</p>
                                <p className="text-3xl font-bold text-white">{analytics.avgTasksPerUser}</p>
                            </div>
                            <TrendingUp className="w-8 h-8 text-yellow-400" />
                        </div>
                    </div>
                </div>

                {/* Role Distribution */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                        <h3 className="text-xl font-semibold text-white mb-4">Role Distribution</h3>
                        <div className="space-y-3">
                            {Object.entries(analytics.roleStats).map(([role, count]) => (
                                <div key={role} className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        {getRoleIcon(role)}
                                        <span className="text-slate-300 capitalize">{role}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-white font-semibold">{count}</span>
                                        <span className="text-slate-400 text-sm">
                                            ({((count / analytics.totalUsers) * 100).toFixed(1)}%)
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                        <h3 className="text-xl font-semibold text-white mb-4">Activity Overview</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-slate-300">Users with Tasks</span>
                                <span className="text-white font-semibold">{analytics.activeUsers}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-300">Users without Tasks</span>
                                <span className="text-white font-semibold">{analytics.totalUsers - analytics.activeUsers}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-300">Activity Rate</span>
                                <span className="text-white font-semibold">
                                    {((analytics.activeUsers / analytics.totalUsers) * 100).toFixed(1)}%
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                        <h3 className="text-xl font-semibold text-white mb-4">System Stats</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-slate-300">Registration Days</span>
                                <span className="text-white font-semibold">{analytics.uniqueRegistrationDates}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-300">Total Rate Limits</span>
                                <span className="text-white font-semibold">
                                    {analytics.rateLimitStats.reduce((sum, user) => sum + user.rateLimitCount, 0)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Top Performers */}
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-8">
                    <h3 className="text-xl font-semibold text-white mb-4">Top Performers by Task Count</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {analytics.activityStats.slice(0, 6).map((user, index) => (
                            <div key={user._id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center space-x-2">
                                        {getRoleIcon(user.role)}
                                        <span className="text-white font-medium truncate">{user.name}</span>
                                    </div>
                                    <span className="text-yellow-400 font-bold">#{index + 1}</span>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-300">Tasks</span>
                                        <span className="text-white font-semibold">{user.taskCount}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-300">Productivity</span>
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${getProductivityColor(user.productivity)}`}>
                                            {user.productivity}%
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-400 font-semibold">Contact</span>
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold border ${getProductivityColor(user.productivity)
                                                }`}
                                        >
                                            {user?.whatsappNumber || 'N/A'}
                                        </span>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Detailed User Table */}
                <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 overflow-hidden">
                    <div className="p-6 border-b border-white/10">
                        <h3 className="text-xl font-semibold text-white">Detailed User Analytics</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-white/5">
                                <tr>
                                    <th className="text-left p-4 text-slate-300 font-medium">User</th>
                                    <th className="text-left p-4 text-slate-300 font-medium">Role</th>
                                    <th className="text-left p-4 text-slate-300 font-medium">Tasks</th>
                                    <th className="text-left p-4 text-slate-300 font-medium">Productivity</th>
                                    <th className="text-left p-4 text-slate-300 font-medium">Rate Limit</th>
                                    <th className="text-left p-4 text-slate-300 font-medium">Contact</th>
                                    <th className="text-left p-4 text-slate-300 font-medium">Joined</th>
                                    <th className="text-left p-4 text-slate-300 font-medium">Last Update</th>
                                </tr>
                            </thead>
                            <tbody>
                                {analytics.activityStats.map((user, index) => (
                                    <tr key={user._id} className={`border-b border-white/5 hover:bg-white/5 transition-colors ${index % 2 === 0 ? 'bg-white/2' : ''}`}>
                                        <td className="p-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-white font-semibold">
                                                    {user.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <div className="text-white font-medium">{user.name}</div>
                                                    <div className="text-slate-400 text-sm">{user.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center space-x-2">
                                                {getRoleIcon(user.role)}
                                                <span className="text-slate-300 capitalize">{user.role}</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className="text-white font-semibold">{user.taskCount}</span>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getProductivityColor(user.productivity)}`}>
                                                {user.productivity}%
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <span className="text-slate-300">{user.rateLimit?.count || 0}</span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center space-x-2">
                                                {user.whatsappNumber && (
                                                    <div className="flex items-center space-x-1 text-green-400">
                                                        <Phone className="w-4 h-4" />
                                                        <span className="text-xs">{user.whatsappNumber}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className="text-slate-300 text-sm">{formatDate(user.createdAt)}</span>
                                        </td>
                                        <td className="p-4">
                                            <span className="text-slate-300 text-sm">{formatDate(user.updatedAt)}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;