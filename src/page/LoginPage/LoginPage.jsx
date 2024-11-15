import React, {useEffect, useState} from 'react';
import '../../App.css';
import './style/LoginPage.style.css';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {loginWithEmail, loginWithGoogle} from '../../features/user/userSlice';
import {GoogleLogin, GoogleOAuthProvider, useGoogleLogin} from '@react-oauth/google';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user, loginError} = useSelector((state) => state.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberEmail, setRememberEmail] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem('savedEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberEmail(true);
    }
  }, []);

  const handleRememberEmailChange = (e) => {
    setRememberEmail(e.target.checked);
    if (!e.target.checked) {
      localStorage.removeItem('savedEmail');
      setEmail('');
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (loginError) {
      dispatch(clearErrors());
    }
  }, [dispatch]);

  const handleLoginWithEmail = (e) => {
    e.preventDefault();
    if (rememberEmail) {
      localStorage.setItem('savedEmail', email);
    }
    dispatch(loginWithEmail({email, password}));
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      const {credential} = tokenResponse;
      if (credential) {
        dispatch(loginWithGoogle(credential)).then((result) => {
          if (result.meta.requestStatus === 'fulfilled') {
            navigate('/');
          }
        });
      }
    },
    onError: () => {
      console.error('Google Login Failed');
    }
  });

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
                    placeholder='이메일아이디를 @까지 정확하게 입력해주세요'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </p>
                <p className='input-line'>
                  <label>비밀번호</label>
                  <input
                    type='password'
                    className='form-control'
                    placeholder='영문+숫자 조합 8~16자리를 입력해주세요'
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </p>
              </div>
              <div>
                <button className='login-button' onClick={handleLoginWithEmail}>
                  로그인
                </button>
              </div>
            </div>
            <div className='login-option'>
              <label class='custom-checkbox'>
                <input type='checkbox' checked={rememberEmail} onChange={handleRememberEmailChange} />
                <span class='checkmark' />
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
            <div className='email-content'>이메일로 간편하고 빠르게!</div>
            <button className='email-signup'>이메일로 가입하기</button>
          </div>
          <div className='join-sns'>
            <div className='sns-content'>SNS계정으로 OF YOU를 이용해보세요</div>

            <div className='sns-buttons'>
              <button className='sns-signup'>카카오로 시작하기</button>

              <div className='sosial-flex'>
                <div className='google-login-icon' onClick={handleGoogleLogin}>
                  <img src='/images/ico_sm_google.svg' alt='Google Login Icon' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
