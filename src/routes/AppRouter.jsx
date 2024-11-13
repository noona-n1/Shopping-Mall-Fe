import React from 'react';
import {Route, Routes} from 'react-router-dom';
import HomePage from './../page/HomePage/HomePage';
import LoginPage from '../page/LoginPage/LoginPage';

function AppRouter() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
    </Routes>
  );
}

export default AppRouter;
