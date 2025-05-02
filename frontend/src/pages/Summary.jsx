import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Summary = () => {
    const [tasks, setTasks] = useState([]);
    const user = JSON.parse(localStorage.getItem('user')) || null;
    const userID = user?.user.id;

    const getAllUserTasks = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/task/getAllTasks/${userID}`);
            setTasks(response.data.tasks);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        getAllUserTasks();
    }, []);

    const isToday = (dateString) => {
        const today = new Date();
        const date = new Date(dateString);
        return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        );
    };

    const isThisWeek = (dateString) => {
        const today = new Date();
        const date = new Date(dateString);

        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());

        const endOfWeek = new Date(today);
        endOfWeek.setDate(today.getDate() + (6 - today.getDay()));

        return date >= startOfWeek && date <= endOfWeek;
    };

    const completedCount = tasks.filter(task => task.completionStatus === 'Completed').length;
    const overdueCount = tasks.filter(task => task.completionStatus === 'Overdue').length;
    const dueTodayCount = tasks.filter(task => isToday(task.dueDate)).length;
    const weeklyCount = tasks.filter(task => isThisWeek(task.dueDate)).length;
    const productivity = tasks.length > 0
        ? Math.round((completedCount / tasks.length) * 100)
        : 0;

    return (
        <div className="px-4 md:px-10 py-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">📊 Dashboard Summary</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                {/* Completed */}
                <Card
                    title="Completed"
                    count={completedCount}
                    color="green"
                    icon={<CheckIcon />}
                    footer="Tasks marked as completed"
                />

                {/* Overdue */}
                <Card
                    title="Overdue"
                    count={overdueCount}
                    color="red"
                    icon={<ExclamationIcon />}
                    footer="Tasks missed their deadline"
                />

                {/* Due Today */}
                <Card
                    title="Due Today"
                    count={dueTodayCount}
                    color="orange"
                    icon={<ClockIcon />}
                    footer={`${tasks.filter(t => t.priority === 'High' && isToday(t.dueDate)).length} high priority`}
                />

                {/* Productivity */}
                <Card
                    title="Productivity"
                    count={`${productivity}%`}
                    color="indigo"
                    icon={<TrendingUpIcon />}
                    footer={<ProgressBar percentage={productivity} color="indigo" />}
                />

                {/* Weekly */}
                <Card
                    title="This Week"
                    count={weeklyCount}
                    color="blue"
                    icon={<CalendarIcon />}
                    footer={`${weeklyCount - completedCount} tasks left`}
                />
            </div>
        </div>
    );
};

// Card Component
const Card = ({ title, count, color, icon, footer }) => (
    <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">{title}</p>
                <p className={`text-2xl font-bold text-${color}-600 mt-1`}>{count}</p>
            </div>
            <div className={`p-2 bg-${color}-100 rounded-lg`}>
                {icon}
            </div>
        </div>
        <div className="mt-2 text-xs text-gray-600">{footer}</div>
    </div>
);

// ProgressBar Component
const ProgressBar = ({ percentage, color }) => (
    <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
        <div
            className={`bg-${color}-600 h-1.5 rounded-full`}
            style={{ width: `${percentage}%` }}
        />
    </div>
);

// Icons
const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>
);

const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const TrendingUpIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
);

const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
);

const ExclamationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07" />
    </svg>
);

export default Summary;
