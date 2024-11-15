import React, {useEffect, useState} from 'react';
import '../../App.css';
import './style/LoginPage.style.css';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {loginWithEmail, loginWithGoogle} from '../../features/user/userSlice';
import {GoogleLogin, GoogleOAuthProvider} from '@react-oauth/google';
import {clearErrors} from '../../features/user/userSlice';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user, loginError} = useSelector((state) => state.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberEmail, setRememberEmail] = useState(false);
  const [error, setError] = useState('');
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;

  useEffect(() => {
    const savedEmail = localStorage.getItem('savedEmail');
    setError('');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberEmail(true);
    }
  }, []);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (loginError) {
      setError('이메일과 비밀번호를 확인해주세요');
      dispatch(clearErrors());
    }
  }, [loginError, dispatch]);

  const navigateSignupPage = () => {
    navigate('/signup');
  };

  const handleRememberEmailChange = (e) => {
    setRememberEmail(e.target.checked);
    if (!e.target.checked) {
      localStorage.removeItem('savedEmail');
      setEmail('');
    }
  };

  const handleLoginWithEmail = (e) => {
    e.preventDefault();
    setError(''); // 기존 에러 메시지 초기화

    // 유효성 검사
    if (!email) {
      setError('이메일을 입력해 주세요.');
      return;
    }
    if (!password) {
      setError('이메일과 비밀번호를 확인해 주세요.');
      return;
    }

    // 이메일 저장
    if (rememberEmail) {
      localStorage.setItem('savedEmail', email);
    }

    // 로그인 요청
    dispatch(loginWithEmail({email, password}));
  };

  const handleGoogleLogin = async (googleData) => {
    //구글 로그인 하기
    dispatch(loginWithGoogle(googleData.credential));
  };

  return (
    <>
      <div className='sub-title-wrab'>
        <div className='sub-title-name'>
          <p className='sub-title'>LOGIN</p>
        </div>
        <div className='member-join'>
          <div className='join-content'>
            <div className='form-container'>
              <div className='login-wrab'>
                <p className='input-line'>
                  <label>이메일 아이디</label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='이메일을 입력해주세요'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </p>
                <p className='input-line'>
                  <label>비밀번호</label>
                  <input
                    type='password'
                    className='form-control'
                    placeholder='영문+숫자 조합 8~16자리'
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </p>
                {error && <p className='required'>{error}</p>}
              </div>
              <div>
                <button className='login-button' onClick={handleLoginWithEmail}>
                  로그인
                </button>
              </div>
            </div>
            <div className='login-option'>
              <label className='custom-checkbox'>
                <input type='checkbox' checked={rememberEmail} onChange={handleRememberEmailChange} />
                <span className='checkmark' />
                이메일 저장
              </label>
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
        <div className='join'>
          <div className='join-email'>
            <div className='email-content'>이메일로 간편하고 빠르게 회원가입하세요</div>
            <button className='email-signup' onClick={navigateSignupPage}>
              이메일로 가입하기
            </button>
          </div>
          <div className='join-sns'>
            <div className='sns-content'>SNS계정으로 OF YOU를 이용해보세요</div>

            <div className='sns-buttons'>
              <button className='sns-signup'>카카오로 시작하기</button>

              <div className='sosial-flex'>
                <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                  <GoogleLogin
                    onSuccess={handleGoogleLogin}
                    onError={() => {
                      console.log('Login Failed');
                    }}
                  />
                </GoogleOAuthProvider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
