import React from 'react';
import '../../App.css';
import './style/LoginPage.style.css';

const LoginPage = () => {
  return (
    <>
      <div className='sub-title-wrab'>
        <p className='sub-title'>LOGIN</p>
      </div>
      <div className='member-join'>
        <div className='join-content'>
          <div className='form-container'>
            <div className='login-wrab'>
              <p>
                <label>이메일 아이디</label>
                <input type='text' className='form-control' placeholder='이메일 입력' />
              </p>
              <p>
                <label>비밀번호</label>
                <input type='password' className='form-control' placeholder='비밀번호 입력' />
              </p>
            </div>
            <button className='login-button'>로그인</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
