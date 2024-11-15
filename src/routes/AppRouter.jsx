import React from 'react';
import {Route, Routes} from 'react-router-dom';
import HomePage from './../page/HomePage/HomePage';
import LoginPage from '../page/LoginPage/LoginPage';
import SignupPage from '../page/SignupPage/SignupPage';
import AdminUserPage from '../page/AdminUserPage/AdminUserPage';
import AdminOrderPage from '../page/AdminOrderPage/AdminOrderPage';
import AdminProduct from '../page/AdminProductPage/AdminProductPage';
import CartPage from '../page/CartPage/CartPage';
import MyPage from '../page/MyPage/MyPage';
import OrderCompletePage from '../page/OrderCompletePage/OrderCompletePage';
import PaymentPage from '../page/PaymentPage/PaymentPage';
import PrivateRoute from './PrivateRoute';
import ProductDetail from '../page/ProductDetailPage/ProductDetailPage';
import LikePage from '../page/LikePage/LikePage';

function AppRouter() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<SignupPage />} />
      <Route path='/product/:id' element={<ProductDetail />} />
      <Route element={<PrivateRoute permissionLevel='customer' />}>
        <Route path='/cart' element={<CartPage />} />
        <Route path='/payment' element={<PaymentPage />} />
        <Route path='/payment/success' element={<OrderCompletePage />} />
        <Route path='/mypage/' element={<MyPage />} />
        <Route path='/mypage/like' element={<LikePage />} />
      </Route>
      <Route element={<PrivateRoute permissionLevel='admin' />}>
        <Route path='/admin/user' element={<AdminUserPage />} />
        <Route path='/admin/product' element={<AdminProduct />} />
        <Route path='/admin/order' element={<AdminOrderPage />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
