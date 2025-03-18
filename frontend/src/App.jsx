import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Home from './pages/Home'


const App = () => {


  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/home' element={<Home/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
