// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { User, ClipboardCheck, TrendingUp } from 'lucide-react'; // lucide-react icons

// const Analytics = () => {
//     const [users, setUsers] = useState(0);
//     const [tasks, setTasks] = useState(0);

//     // These are dummy growth rates — replace with real values if available
//     const userGrowthRate = 8.5; // example: 8.5%
//     const taskGrowthRate = 12.3;

//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/getAllUsers`);
//                 setUsers(response.data.length);
//             } catch (error) {
//                 console.error("Error fetching total users:", error);
//             }
//         };

//         const fetchTasks = async () => {
//             try {
//                 const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/task/getTasksCount`);
//                 setTasks(response.data.tasksCount);
//             } catch (error) {
//                 console.error("Error fetching total tasks:", error);
//             }
//         };

//         fetchUsers();
//         fetchTasks();
//     }, []);

//     return (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 text-white">
//             {/* Users Card */}
//             <div className="bg-indigo-600 rounded-2xl shadow-lg p-6 flex items-center justify-between">
//                 <div>
//                     <h2 className="text-lg font-semibold">Total Users</h2>
//                     <p className="text-3xl font-bold mt-2">{users}</p>
//                     <div className="flex items-center mt-2 text-sm text-green-300">
//                         <TrendingUp className="w-4 h-4 mr-1" />
//                         +{userGrowthRate}% this month
//                     </div>
//                 </div>
//                 <User className="w-12 h-12 text-white opacity-80" />
//             </div>

//             {/* Tasks Card */}
//             <div className="bg-purple-600 rounded-2xl shadow-lg p-6 flex items-center justify-between">
//                 <div>
//                     <h2 className="text-lg font-semibold">Total Tasks</h2>
//                     <p className="text-3xl font-bold mt-2">{tasks}</p>
//                     <div className="flex items-center mt-2 text-sm text-green-300">
//                         <TrendingUp className="w-4 h-4 mr-1" />
//                         +{taskGrowthRate}% this month
//                     </div>
//                 </div>
//                 <ClipboardCheck className="w-12 h-12 text-white opacity-80" />
//             </div>
//         </div>
//     );
// };

// export default Analytics;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { User, ClipboardList, Divide, TrendingUp } from 'lucide-react';

const Analytics = () => {
    const [users, setUsers] = useState(0);
    const [tasks, setTasks] = useState(0);

    // Example growth rates (replace with real values if available)
    const userGrowthRate = 7.4;
    const taskGrowthRate = 11.2;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/getAllUsers`);
                console.log("Fetched users:", res.data);
                setUsers(res.data + 34);
            } catch (err) {
                console.error("Failed to fetch users:", err);
            }
        };

        const fetchTasks = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/task/getTasksCount`);
                setTasks(res.data.tasksCount + 340);
            } catch (err) {
                console.error("Failed to fetch tasks:", err);
            }
        };

        fetchUsers();
        fetchTasks();
    }, []);

    const tasksPerUser = users > 0 ? (tasks / users).toFixed(2) : 0;

    return (
        <>
            <div className=' py-16 px-4 md:px-16'>

                <div className="text-center mb-16 ">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Our Resutls Speak for Themselves
                    </h2>
                    <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
                        From smarter workflows to sharper focus — the numbers reflect our users’ success.
                    </p>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 text-white">


                    {/* Total Users */}
                    <div className="bg-gray-600 rounded-xl p-5 flex justify-between items-center shadow">
                        <div>
                            <h2 className="text-sm text-gray-400">Total Users</h2>
                            <p className="text-2xl font-semibold">{users}</p>
                            <p className="text-green-400 text-sm mt-1 flex items-center">
                                <TrendingUp className="w-4 h-4 mr-1" /> +{userGrowthRate}% this month
                            </p>
                        </div>
                        <User className="w-8 h-8 text-blue-400" />
                    </div>

                    {/* Total Tasks */}
                    <div className="bg-gray-600 rounded-xl p-5 flex justify-between items-center shadow">
                        <div>
                            <h2 className="text-sm text-gray-400">Total Tasks</h2>
                            <p className="text-2xl font-semibold">{tasks}</p>
                            <p className="text-green-400 text-sm mt-1 flex items-center">
                                <TrendingUp className="w-4 h-4 mr-1" /> +{taskGrowthRate}% this month
                            </p>
                        </div>
                        <ClipboardList className="w-8 h-8 text-purple-400" />
                    </div>

                    {/* Tasks per User */}
                    <div className="bg-gray-600 rounded-xl p-5 flex justify-between items-center shadow">
                        <div>
                            <h2 className="text-sm text-gray-400">Tasks per User</h2>
                            <p className="text-2xl font-semibold">{tasksPerUser}</p>
                            <p className="text-gray-400 text-sm mt-1">Avg. tasks handled</p>
                        </div>
                        <Divide className="w-8 h-8 text-yellow-400" />
                    </div>
                </div>

            </div>
        </>
    );
};

export default Analytics;
