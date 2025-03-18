import React, { useState } from 'react';

function Home() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);

  const handleAddTodo = () => {
    if (todo.trim() !== '') {
      setTodos([...todos, todo]);
      setTodo('');
    }
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-semibold text-center mb-6">To-Do List</h1>
        
        <div className="flex mb-4">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            placeholder="Add a new task"
          />
          <button
            onClick={handleAddTodo}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        <ul className="space-y-4">
          {todos.map((item, index) => (
            <li key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-md shadow-sm">
              <span className="text-lg">{item}</span>
              <button
                onClick={() => handleDeleteTodo(index)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
