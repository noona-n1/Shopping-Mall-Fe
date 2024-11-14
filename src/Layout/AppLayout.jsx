import React, {useEffect} from 'react';
import Navbar from '../common/components/Navbar';
import Footer from '../common/components/Footer';
import './AppLayout.style.css';
import {useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {loginWithToken} from '../features/user/userSlice';

const AppLayout = ({children}) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(loginWithToken());
  }, []);

  return (
    <div className='app-layout'>
      <Navbar user={user} />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default AppLayout;
