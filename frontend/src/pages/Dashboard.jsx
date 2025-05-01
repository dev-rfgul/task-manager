

import React, { useEffect, useState } from 'react';
import axios from 'axios';


import AddTodo from './AddTodo'

function Dashboard() {
  const [tasks, setTasks] = useState([]); //to store all the tasks which are unsorted
  const [tasks2, setTasks2] = useState([]) // it will store all the tasks in sorted by their due date.
  const [updatedTask, setUpdateTask] = useState()
  const [arrangedTask, setArrangedTask] = useState([]);
  const [showAiSuggestion, setShowAiSuggestion] = useState(true);

  const toggleCloseAiSuggestion = () => {
    setShowAiSuggestion(prev => !prev);
  };


  const user = JSON.parse(localStorage.getItem("user")) || null;
  // console.log(user)
  const userID = user?.user.id
  console.log("userid",userID)
  // Fix the API call function
  const getAllUserTasks = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/task/getAllTasks/${userID}`);
      setTasks(response.data.tasks);
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

  // Helper functions
  function getPriorityBorderColor(priority) {
    switch (priority) {
      case 'High': return 'border-red-200';
      case 'Medium': return 'border-orange-200';
      case 'Low': return 'border-green-200';
      default: return 'border-gray-200';
    }
  }

  function getPriorityDotColor(priority) {
    switch (priority) {
      case 'High': return 'bg-red-500';
      case 'Medium': return 'bg-orange-500';
      case 'Low': return 'bg-green-500';
      default: return 'bg-gray-500';
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



  const completedTasks = tasks.filter(task => task.completed).length;
  const dueTodayTasks = tasks.filter(task =>
    !task.completed &&
    new Date(task.dueDate).toDateString() === new Date().toDateString()
  ).length;
  // console.log(tasks2)
  // Function to sort tasks based on due date
  // Replace the sortTasksByDueDate function with this:
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


  // Fix your second useEffect to depend on tasks2:
  useEffect(() => {
    if (tasks2 && tasks2.length > 0) {
      sortTasksByDueDate();
    }
  }, [tasks]);

  const deleteTask = async (taskID) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/task/deleteTask/${taskID}`)
      console.log(response.data)
    } catch (error) {

    }
  }

  const arrangeTasksByAi = async () => {
    console.log("btn clicked");
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/aiSuggestion/${userID}`)
    const data = (response.data.message.candidates[0].content.parts[0].text)
    console.log("the data is ", data);

    // Remove the backticks (if they are around the JSON text)
    const cleanedData = data.replace(/^```json\s*/, '').replace(/\s*```$/, '');

    // Ensure cleaned data is valid JSON format
    console.log("cleaned data: ", cleanedData);

    // Now parse the JSON data
    try {
      const jsonData = JSON.parse(cleanedData);
      console.log("Parsed JSON data:", jsonData);
      setArrangedTask(jsonData);
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  };


  console.log(arrangedTask)

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-6">
        {/* Header Section - Improved responsiveness */}
        <header className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 text-white p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">TaskSync<span className="text-indigo-600">AI</span></h1>

              </div>
            </div>
            <div className="flex items-center gap-4 w-full sm:w-auto">
              {/* Search - Full width on mobile, normal on larger screens */}
              <div className="relative flex-grow sm:flex-grow-0">
                <input
                  type="text"
                  placeholder="Search tasks..."
                  className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-64"
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div className="flex items-center gap-3">
                <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </button>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-semibold shadow-md">{user.user.name[0]}</div>
                  <span className="text-sm font-medium text-gray-700 hidden sm:inline">{user.user.name}</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Summary Cards - Improved grid for different screen sizes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Completed</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{completedTasks}</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <div className="mt-2">
              <span className="text-xs text-green-600 font-medium flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                12% from yesterday
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Due Today</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{dueTodayTasks}</p>
              </div>
              <div className="p-2 bg-orange-100 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-2">
              <span className="text-xs text-orange-600 font-medium">2 high priority</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Productivity</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">86%</p>
              </div>
              <div className="p-2 bg-indigo-100 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: '86%' }}></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Weekly</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{tasks.length}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
            <div className="mt-2">
              <span className="text-xs text-blue-600 font-medium flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                3 more than last week
              </span>
            </div>
          </div>
        </div>

        {/* Main Content - Improved responsive layout */}
        <main className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Task Management */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold text-gray-800">Your Tasks</h2>
                  <span className="bg-indigo-100 text-indigo-700 text-xs font-medium px-2 py-1 rounded-full">{tasks.length}</span>
                </div>
                <div className="flex gap-1">
                  <button className="px-3 py-1.5 bg-indigo-600 text-white rounded-md text-sm font-medium shadow-sm hover:bg-indigo-700 transition-colors">
                    <span className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      New Task
                    </span>
                  </button>
                  <button className="p-1.5 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                  </button>
                  <button className="p-1.5 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Tab Navigation - Scrollable on small screens */}
              <div className="flex overflow-x-auto pb-2 mb-6 border-b scrollbar-hide">
                <button className="px-4 py-2 text-sm font-medium text-indigo-600 border-b-2 border-indigo-600 whitespace-nowrap">Today</button>
                <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 whitespace-nowrap">Tomorrow</button>
                <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 whitespace-nowrap">Upcoming</button>
                <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 whitespace-nowrap">Completed</button>
              </div>

              {/* AI Recommendation - Enhanced Responsive Layout */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-lg p-4 sm:p-6 mb-8 shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="bg-indigo-600 text-white rounded-full p-3 sm:p-4 self-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                    </svg>
                  </div>

                  <div className="flex-1 bg-indigo-50 p-6 rounded-xl shadow-md">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-indigo-900 text-xl sm:text-2xl">AI Suggestion</h3>
                      <button
                        onClick={toggleCloseAiSuggestion}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md transition"
                      >
                        {showAiSuggestion ? 'Hide' : 'Show'}
                      </button>
                    </div>

                    <p className="text-sm text-indigo-700 mb-4">
                      Enter your tasks and let the AI organize them, just like a personal assistant!
                    </p>

                    {showAiSuggestion && (
                      <>
                        <div className="space-y-4 mb-6">
                          {arrangedTask.map((task, index) => (
                            <div
                              key={index}
                              className="bg-white p-4 rounded-lg shadow-sm border border-indigo-200"
                            >
                              <h1 className="text-lg font-semibold text-indigo-800">{task.title}</h1>
                              <p className="text-sm text-indigo-600 mt-1">{task.reason}</p>
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={arrangeTasksByAi}
                        className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition"
                      >
                        Arrange Tasks
                      </button>
                      {/* Future button
    <button className="px-4 py-2 bg-white text-indigo-600 border border-indigo-300 text-sm rounded-lg hover:bg-indigo-50 transition">
      Snooze
    </button> */}
                    </div>
                  </div>

                </div>
              </div>


              {/* Task List - Improved responsive layout */}
              <div className="space-y-3">
                {tasks2.map((task) => (
                  <div
                    key={task.id}
                    className={`bg-white rounded-lg border ${task.completed ? 'border-gray-200' : getPriorityBorderColor(task.priority)} 
                                shadow-sm hover:shadow-md transition-all p-3 sm:p-4 ${task.completed ? 'opacity-60' : ''}`}
                  >
                    <div className="flex items-start sm:items-center gap-3">
                      <div className="pt-0.5">
                        <input type="checkbox" checked={task.completed}
                          className="w-5 h-5 text-indigo-600 rounded-full focus:ring-indigo-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                              {task.title}
                            </h3>
                            <p className={`text-sm ${task.completed ? 'text-gray-400 line-through' : 'text-gray-600'} mt-1`}>
                              {task.description}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 mt-2 sm:mt-0">
                            <span className={`${getPriorityBadgeColor(task.priority)} text-xs px-2 py-0.5 rounded-full`}>
                              {task.priority}
                            </span>
                            <div className="flex text-gray-400">
                              <button
                                onClick={() => setUpdateTask(task)}
                                className="p-1 hover:text-indigo-600 rounded-full hover:bg-indigo-50">
                                {/* edit icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                              <button
                                onClick={() => { deleteTask(task._id) }}
                                className="p-1 hover:text-red-600 rounded-full hover:bg-red-50">
                                {/* delete icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-xs">
                          <span className="flex items-center text-gray-500">
                            {/* est time  */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {task.estTime} min
                          </span>
                          <span className="flex items-center text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {task.completed ? 'Completed Today' : formatDueDate(task.dueDate)}
                          </span>
                          {task.tags && task.tags.map(tag => (
                            <span key={tag} className="bg-gray-100 text-gray-600 rounded-full px-2 py-0.5">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center mt-6">
                <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center">
                  Show More Tasks
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Made responsive for small screens */}
          <div className="lg:col-span-1">
            {/* <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Add Task</h2>
              <form>
                <div className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Task title"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Description"
                      rows="2"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    ></textarea>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                      </select>
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Est. time (min)"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Due date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-sm"
                  >
                    Add Task
                  </button>
                </div>
              </form>
            </div> */}
            <AddTodo taskToEdit={updatedTask} />

            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Deadlines</h2>
              <div className="space-y-3">
                {tasks2.filter(t => !t.completed).slice(0, 6).map((task) => (
                  <div key={task.id} className="flex items-center p-2 hover:bg-gray-50 rounded-lg">
                    <div className={`w-2 h-2 rounded-full ${getPriorityDotColor(task.priority)} mr-2`}></div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-800">{task.title}</h4>
                      <p className="text-xs text-gray-500">{formatDueDate(task.dueDate)}</p>
                    </div>
                  </div>
                ))}
                <div className="pt-2">
                  <a href="#" className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">
                    View All Deadlines
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );

}

export default Dashboard;
