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

      <div className='join-email'>
        <div className='email-content'>이메일로 간편하고 빠르게!</div>
        <button className='email-signup'>이메일로 가입하기</button>
      </div>

      <div className='join-sns'>
        <div className='sns-content'>SNS계정으로 of you를 이용해보세요</div>
        <button className='sns-sighup'>카카오로 시작하기</button>
      </div>
    </>
  );
};

export default LoginPage;
