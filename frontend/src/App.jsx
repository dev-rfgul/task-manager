import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home';


const App = () => {

  const user = JSON.parse(localStorage.getItem("user")) || null;
  // Ensure user is valid before accessing role
  const role = user?.user?.role || null;
  const isUserLoggedIn = !!user && !!role;
  // alert(isUserLoggedIn)
  console.log(isUserLoggedIn)
  console.log(user?.user)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={isUserLoggedIn ? <Navigate to="/dashboard" /> : <Home />}
          />

          <Route path="/signup" element={<SignUp />} />
          
          <Route
            path="/login"
            element={isUserLoggedIn ? <Navigate to="/dashboard" /> : <Login />}
          />

          <Route
            path="/dashboard"
            element={isUserLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
