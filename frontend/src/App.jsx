import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import Banner from './pages/Banner';


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
          {isUserLoggedIn ?
            <Route path='/home' element={<Home />} /> :
            <Route path='/login' element={<Login />} />
          }
          <Route path='/' element={<Banner />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
