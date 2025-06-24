

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoaderScreen from '../components/Loader';
import { Link, useNavigate } from 'react-router-dom';
import AiSuggestion from '../components/AiSuggestion';

function Dashboard() {

  const navigate = useNavigate()
  const [tasks, setTasks] = useState([]); //to store all the tasks which are unsorted
  const [tasks2, setTasks2] = useState([]) // it will store all the tasks in sorted by their due date.
  const [updatedTask, setUpdateTask] = useState() // store the updated task data
  const [filteredTask, setFilteredTasks] = useState([]) // filter teh tasks for today,tomorrow and upcoming and completed 
  const [activeFilter, setActiveFilter] = useState("Pending"); // to show the active selection of filtering in today , tomorrow and upcomoing 

  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleClose = () => {
    setStatus("idle");
    setErrorMsg("");
  };


  const user = JSON.parse(localStorage.getItem("user")) || null;

  // console.log(user)
  const userID = user.id
  console.log("userid", userID)

  const token = localStorage.getItem("token");
  console.log("token", token)
  // get all the user tasks from the db
  const getAllUserTasks = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/task/getAllTasks/${userID}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setTasks(response.data.tasks);
      console.log(response.data)
      console.log('unsorted ', response.data.tasks)
      setTasks2(response.data.tasks)
      return response.data.tasks;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  };

  // Fix useEffect dependency
  useEffect(() => {
    if (userID) {
      getAllUserTasks();
    }
  }, [userID]);


  const sendWhatsappMsg = async () => {
    alert("Do not change this message, it is used to link your WhatsApp with the app . By clicking Ok you agree to our terms and conditions.");
    const message = `secret code: ${userID}`;
    window.open(
      `https://wa.me/923329296026?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  }
  const sortTasksByDueDate = () => {
    console.log('entered the sorting func');
    if (!tasks2 || tasks2.length === 0) return; // Guard clause

    const now = new Date();
    console.log(now);

    // Create a new array instead of mutating the original
    const sortedTasks = [...tasks2].sort((a, b) => {
      const dueDateA = new Date(a.dueDate);
      const dueDateB = new Date(b.dueDate);

      // Calculate the difference in minutes between now and each due date
      const minutesRemainingA = (dueDateA - now) / (1000 * 60); // Difference in minutes
      const minutesRemainingB = (dueDateB - now) / (1000 * 60); // Difference in minutes

      return minutesRemainingA - minutesRemainingB; // Sort by remaining minutes
    });

    setTasks2(sortedTasks);
    console.log(sortedTasks);
  };

  const deleteTask = async (taskID) => {
    setStatus("loading")
    try {
      const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/task/deleteTask/${taskID}`)
      console.log(response.data)
      setStatus("success")
      setSuccessMsg(response.data.message)
      window.location.reload();
    } catch (error) {
      setStatus("error")
      setErrorMsg("Error while deleting the Task")
    }
  }

  const updateTask = async (todo) => {
    navigate('/add-todo', { state: { todo } })

  }


  const updateCompletionStatus = async (taskID, completionStatus) => {
    try {
      // setStatus("loading")
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/task/updateTaskStatus`, {
        taskID,
        completionStatus
      },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      if (!response) {
        setStatus("error")
        setErrorMsg(response.data.message)
      }
      setStatus("success")
      setSuccessMsg("Updated successfully")
      window.location.reload();
    } catch (error) {
      setStatus("error")
      setErrorMsg("error occured while updating the task")
    }

  }

  const filterTaskByCompletionStatus = (status) => {
    setActiveFilter(status)
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const getDateOnly = (date) =>
      new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();

    const filtered = tasks2.filter(task => {
      const taskDate = new Date(task.dueDate);
      const taskDay = getDateOnly(taskDate);
      const todayDay = getDateOnly(today);
      const tomorrowDay = getDateOnly(tomorrow);

      if (status === "Pending") {
        return task.completionStatus === "Pending" && taskDay === todayDay;
      }

      if (status === "Tomorrow") {
        return task.completionStatus === "Pending" && taskDay === tomorrowDay;
      }

      if (status === "late") {
        return task.completionStatus === "Pending" && taskDay > tomorrowDay;
      }

      if (status === "Completed") {
        return task.completionStatus === "Completed";
      }
      if (status === "Overdue") {
        console.log(task.completionStatus)
        return task.completionStatus === "Overdue"
      }

      return false;
    });

    setFilteredTasks(filtered);
  };
  // Helper functions
  function getPriorityBorderColor(priority) {
    switch (priority) {
      case 'High': return 'border-red-200';
      case 'Medium': return 'border-orange-200';
      case 'Low': return 'border-green-200';
      default: return 'border-gray-200';
    }
  }

  function getPriorityBadgeColor(priority) {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-orange-100 text-orange-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  function formatDueDate(dateString) {
    const date = new Date(dateString);
    const today = new Date();

    if (date.toDateString() === today.toDateString()) {
      return `Today, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (date.toDateString() === tomorrow.toDateString()) {
      return `Tomorrow, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }

    return date.toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  }
  useEffect(() => {
    if (tasks2.length > 0)
      filterTaskByCompletionStatus("Pending")
  }, [tasks2])

  useEffect(() => {
    if (tasks2 && tasks2.length > 0) {
      sortTasksByDueDate();
    }
  }, [tasks]);


  // console.log(user)
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen relative ">
      <LoaderScreen status={status} errorMessage={errorMsg} onClose={handleClose} />
      <div className="container mx-auto px-4 py-6">
        {/* Header Section - Improved responsiveness */}
        <header className="mb-8 px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Logo Section */}
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 text-white p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-800">
                Task AI <span className="text-indigo-600">Studio</span>
              </h1>
            </div>

            {/* Right Section */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              {/* WhatsApp Button */}
              <button

                onClick={() => {
                  sendWhatsappMsg()
                }}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-900 text-white text-sm rounded-lg transition"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M16 0C7.164 0 0 6.99 0 15.615c0 2.757.763 5.34 2.073 7.591L0 32l8.005-2.094A15.964 15.964 0 0016 31.23c8.836 0 16-6.99 16-15.615C32 6.99 24.836 0 16 0zm0 28.615c-2.545 0-4.946-.688-7.01-1.896l-.502-.296-4.755 1.244 1.266-4.63-.327-.475a12.892 12.892 0 01-2.045-7.047c0-7.13 5.943-12.93 13.333-12.93S29.333 8.486 29.333 15.615 23.39 28.615 16 28.615z" />
                </svg>
                Get Alert on WhatsApp
              </button>

              {/* User Info */}
              <div className="flex items-center gap-2">
                {/* Hide Avatar on mobile */}
                <div className="hidden sm:flex w-10 h-10 bg-indigo-600 rounded-full items-center justify-center text-white font-semibold shadow-md">
                  {user.name[0]}
                </div>
                <span className="text-sm font-medium text-gray-700 hidden sm:inline">
                  {user.name}
                </span>
              </div>
            </div>
          </div>
        </header>





        {/* Main Content - Improved responsive layout */}
        <main className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Task Management */}
          {/* Right Sidebar - Made responsive for small screens */}
          <div className="lg:col-span-1 w-full bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-3 text-gray-800">AI Suggestions</h2>
            <AiSuggestion />
          </div>
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold text-gray-800">Your Tasks</h2>

                </div>
                <div className="flex gap-1">
                  <Link to='/add-todo'>
                    <button className="px-3 py-1.5 bg-indigo-600 text-white rounded-md text-sm font-medium shadow-sm hover:bg-indigo-700 transition-colors">
                      <span className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        New Task
                      </span>
                    </button>
                  </Link>


                </div>
              </div>

              {/* Tab Navigation - Scrollable on small screens */}
              <div className="flex overflow-x-auto pb-2 mb-6 border-b scrollbar-hide">
                {["Pending", "Tomorrow", "late", "Completed", "Overdue"].map((status) => {
                  const labels = {
                    Pending: "Today",
                    Tomorrow: "Tomorrow",
                    late: "Upcoming",
                    Completed: "Completed",
                    Overdue: "Overdue"
                  };

                  const isActive = activeFilter === status;

                  return (
                    <button
                      key={status}
                      onClick={() => filterTaskByCompletionStatus(status)}
                      className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${isActive
                        ? "text-indigo-600 border-b-2 border-indigo-600"
                        : "text-gray-500 hover:text-gray-700"
                        }`}
                    >
                      {labels[status]}
                    </button>
                  );
                })}
              </div>



              {/* Task List - Improved responsive layout */}
              <div className="space-y-4">
                {filteredTask.map((task) => (
                  <div
                    key={task.id}
                    className={`bg-white rounded-xl border ${task.completed ? 'border-gray-200' : getPriorityBorderColor(task.priority)} 
                  shadow hover:shadow-lg transition-all p-4 ${task.completed ? 'opacity-60' : ''}`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">


                      {/* Task Content */}
                      <div className="flex-1">
                        {/* Top Row: Title + Actions */}
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                          {/* Title & Description */}
                          <div>
                            <h3 className={`font-semibold text-lg ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                              {task.title}
                            </h3>
                            <p className={`text-sm mt-1 ${task.completed ? 'text-gray-400 line-through' : 'text-gray-600'}`}>
                              {task.description}
                            </p>
                          </div>

                          {/* Select + Priority + Actions */}
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2 sm:mt-0">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2 sm:mt-0">
                              <select
                                className="border border-gray-300 text-gray-700 bg-white rounded-full text-sm px-3 py-1.5 shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                onChange={(e) => updateCompletionStatus(task._id, e.target.value)}
                                defaultValue=""
                              >
                                <option value="" disabled>{task.completionStatus}</option>
                                <option value="Pending">Pending</option>
                                <option value="Completed">Completed</option>
                                <option value="Overdue">Overdue</option>
                              </select>
                            </div>


                            <span className={`${getPriorityBadgeColor(task.priority)} text-xs px-2 py-0.5 rounded-full`}>
                              {task.priority}
                            </span>

                            <div className="flex items-center gap-2 text-gray-400">
                              <button
                                onClick={() => updateTask(task)}
                                className="p-1 hover:text-blue-600 rounded-full hover:bg-blue-50"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                              <button
                                onClick={() => deleteTask(task._id)}
                                className="p-1 hover:text-red-600 rounded-full hover:bg-red-50"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Metadata */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 text-xs text-gray-500">
                          {/* Estimated Time */}
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {task.estTime} min
                          </span>

                          {/* Due Date */}
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {task.completed ? 'Completed Today' : formatDueDate(task.dueDate)}
                          </span>

                          {/* Tags */}
                          {task.tags && task.tags.map(tag => (
                            <span key={tag} className="bg-gray-100 text-gray-700 rounded-full px-2 py-0.5">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>


        </main>
      </div>
    </div>
  );

}

export default Dashboard;
