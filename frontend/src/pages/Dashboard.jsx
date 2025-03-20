// // src/pages/Home.jsx
// import React from 'react';

// const Banner = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 flex items-center justify-center px-6">
//       <div className="max-w-4xl w-full text-white text-center space-y-6">
//         <h1 className="text-4xl md:text-6xl font-bold leading-tight drop-shadow-md">
//           Smart AI To-Do List
//         </h1>
//         <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
//           Organize smarter, not harder. Let AI prioritize and schedule your tasks efficiently based on deadlines and importance.
//         </p>
//         <button className="mt-4 px-8 py-3 bg-white text-blue-600 font-semibold rounded-xl shadow-md hover:scale-105 transition-all duration-300">
//           Get Started
//         </button>

//         {/* Optional: Image or Illustration */}
//         <div className="mt-10">
//           <img
//             src="https://www.rfgul.live/images/banner-img.png" // You can replace this with your image
//             alt="AI Planning Illustration"
//             className="mx-auto max-w-md w-full rounded-xl shadow-lg"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Banner;


import React, { useState } from 'react';

function Dashboard() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Project Proposal",
      description: "Finalize the Q2 project proposal with budget estimates",
      estimatedTime: 120,
      priority: "Urgent",
      dueDate: "2025-03-19T17:00",
      completed: false
    },
    {
      id: 2,
      title: "Client Meeting Preparation",
      description: "Prepare slides and talking points for tomorrow's client meeting",
      estimatedTime: 45,
      priority: "High",
      dueDate: "2025-03-20T09:00",
      completed: false
    },
    {
      id: 3,
      title: "Weekly Team Report",
      description: "Compile team progress report for the past week",
      estimatedTime: 60,
      priority: "Medium",
      dueDate: "2025-03-22T15:00",
      completed: true
    },
    {
      id: 4,
      title: "Update Documentation",
      description: "Update the API documentation with new endpoints",
      estimatedTime: 30,
      priority: "Low",
      dueDate: "2025-03-19T12:00",
      completed: true
    }
  ]);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    estimatedTime: 30,
    priority: "High",
    dueDate: ""
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setNewTask({
      ...newTask,
      [id]: value
    });
  };

  const addTask = () => {
    if (!newTask.title) return;
    
    const task = {
      id: Date.now(),
      ...newTask,
      completed: false
    };
    
    setTasks([...tasks, task]);
    setNewTask({
      title: "",
      description: "",
      estimatedTime: 30,
      priority: "High",
      dueDate: ""
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Urgent": return "border-red-500";
      case "High": return "border-yellow-500";
      case "Medium": return "border-blue-500";
      case "Low": return "border-green-500";
      default: return "border-gray-300";
    }
  };

  const getPriorityBadgeColor = (priority) => {
    switch (priority) {
      case "Urgent": return "bg-red-100 text-red-800";
      case "High": return "bg-yellow-100 text-yellow-800";
      case "Medium": return "bg-blue-100 text-blue-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const dueTodayTasks = tasks.filter(task => 
    !task.completed && 
    new Date(task.dueDate).toDateString() === new Date().toDateString()
  ).length;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <header className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-indigo-600">TaskSync AI</h1>
              <p className="text-gray-600 mt-1">Your intelligent task organizer</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">Welcome back, Alex</span>
              <div className="w-10 h-10 bg-indigo-200 rounded-full flex items-center justify-center text-indigo-600 font-semibold">A</div>
            </div>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column: Task Input */}
          <div className="bg-white rounded-xl shadow-md p-6 md:col-span-1">
            <h2 className="text-lg font-semibold mb-4">Add New Task</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="title">
                  Task Title
                </label>
                <input 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                  id="title" 
                  type="text" 
                  placeholder="Enter task title"
                  value={newTask.title}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="description">
                  Description
                </label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                  id="description" 
                  rows="3" 
                  placeholder="Enter task details"
                  value={newTask.description}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="estimatedTime">
                    Est. Time (minutes)
                  </label>
                  <input 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                    id="estimatedTime" 
                    type="number" 
                    placeholder="30"
                    value={newTask.estimatedTime}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="priority">
                    Priority
                  </label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                    id="priority"
                    value={newTask.priority}
                    onChange={handleInputChange}
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Urgent</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="dueDate">
                  Due Date
                </label>
                <input 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                  id="dueDate" 
                  type="datetime-local"
                  value={newTask.dueDate}
                  onChange={handleInputChange}
                />
              </div>
              
              <button 
                type="button" 
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md 
                  transition duration-300 flex items-center justify-center"
                onClick={addTask}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add Task
              </button>
            </form>
          </div>
          
          {/* Right Column: Task List */}
          <div className="bg-white rounded-xl shadow-md p-6 md:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Your Tasks</h2>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-md text-sm font-medium">Today</button>
                <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm font-medium">Week</button>
                <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm font-medium">All</button>
              </div>
            </div>
            
            {/* AI Recommendation */}
            <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="bg-indigo-100 rounded-full p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-indigo-800">AI Recommendation</h3>
                  <p className="text-sm text-indigo-700 mt-1">Based on your schedule, I recommend focusing on "Project Proposal" first to meet today's deadline.</p>
                </div>
              </div>
            </div>
            
            {/* Task List */}
            <div className="space-y-4">
              {tasks.map((task) => (
                <div 
                  key={task.id} 
                  className={`border-l-4 ${task.completed ? 'border-gray-300 bg-gray-50 opacity-70' : getPriorityColor(task.priority)} bg-white rounded-r-lg shadow-sm p-4 flex items-center`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>{task.title}</h3>
                      <span className={`${task.completed ? 'bg-gray-100 text-gray-600' : getPriorityBadgeColor(task.priority)} text-xs px-2 py-0.5 rounded`}>
                        {task.completed ? 'Completed' : task.priority}
                      </span>
                    </div>
                    <p className={`text-sm ${task.completed ? 'text-gray-500 line-through' : 'text-gray-600'} mt-1`}>{task.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span>{task.estimatedTime} minutes</span>
                      <span>{task.completed ? 'Completed Today' : `Due: ${new Date(task.dueDate).toLocaleString()}`}</span>
                    </div>
                  </div>
                  <div>
                    <button className="text-gray-400 hover:text-indigo-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
        
        {/* Analytics Section */}
        <section className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6 flex items-center">
            <div className="p-3 bg-green-100 rounded-full mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Completed Today</p>
              <p className="text-xl font-semibold">{completedTasks} Tasks</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 flex items-center">
            <div className="p-3 bg-red-100 rounded-full mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Due Today</p>
              <p className="text-xl font-semibold">{dueTodayTasks} Tasks</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 flex items-center">
            <div className="p-3 bg-purple-100 rounded-full mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Productivity</p>
              <p className="text-xl font-semibold">86%</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 flex items-center">
            <div className="p-3 bg-blue-100 rounded-full mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Weekly Tasks</p>
              <p className="text-xl font-semibold">{tasks.length} Tasks</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
