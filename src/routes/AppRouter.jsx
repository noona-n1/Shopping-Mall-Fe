import React from 'react';
import {Route, Routes} from 'react-router-dom';
import HomePage from './../page/HomePage/HomePage';
import LoginPage from '../page/LoginPage/LoginPage';
import SignupPage from '../page/SignupPage/SignupPage';

function AppRouter() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<SignupPage />} />
    </Routes>
  );
}

export default AppRouter;
