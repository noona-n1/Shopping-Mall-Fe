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
              <p>
                <label class='custom-checkbox'>
                  <input type='checkbox' />
                  <span class='checkmark' />
                  이메일 저장
                </label>
              </p>
            </div>
            <div>
              <button className='login-button'>로그인</button>
              <ul className='link'>
                <li>
                  <a href='#' className='right-line'>
                    아이디 찾기
                  </a>
                </li>
                <li>
                  <a href='#'>비밀번호 찾기</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
