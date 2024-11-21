import { Route, Routes, Navigate } from 'react-router-dom';
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
import CategoryPage from '../page/CategoryPage/CategoryPage';
import ProductDetail from '../page/ProductDetailPage/ProductDetailPage';
import LikePage from '../page/LikePage/LikePage';
import SignupCompletePage from '../page/SignupCompletePage/SignupCompletePage';
import OrderPage from '../page/OrderPage/OrderPage';
import Mypage from '../page/MyPage/MyPage';
import AddressPage from '../page/AddressPage/AddressPage';
import ProfilePage from '../page/ProfilePage/ProfilePage';


function AppRouter() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<SignupPage />} />
      <Route path='/products/category/:category' element={<CategoryPage />} />
      <Route path='/product/:id' element={<ProductDetail />} />
      <Route path='/signup/success' element={<SignupCompletePage />} />

      <Route element={<PrivateRoute permissionLevel='customer' />}>
        <Route path='/cart' element={<CartPage />} />
        <Route path='/payment' element={<PaymentPage />} />
        <Route path='/payment/success' element={<OrderCompletePage />} />

        <Route path='/mypage' element={<Mypage />}>
          <Route index element={<Navigate to="/mypage/order" replace />} />
          <Route path='order' element={<OrderPage />} />
          <Route path='like' element={<LikePage />} />
          <Route path="addresslist" element={<AddressPage />} />
          <Route path='profile' element={<ProfilePage />} />

        </Route>
      </Route>

      <Route element={<PrivateRoute permissionLevel='admin' />}>
        <Route path='/admin/product' element={<AdminProduct />} />
        <Route path='/admin/order' element={<AdminOrderPage />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
