import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate, useLocation, useResolvedPath} from 'react-router-dom';
import {fetchKakaoToken} from '../../features/user/userSlice';
import axios from 'axios';
import api from '../../utils/api';

const KakaoLoginButton = () => {
  const fetchTokenAfterPopupClosed = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/auth/kakao/callback');
      const data = await response.json();

      if (data.token) {
        console.log('로그인 성공, 토큰:', data.token);

        // 클라이언트 측에 토큰 저장
        localStorage.setItem('token', data.token);

        // 메인 페이지로 이동
        window.location.href = '/';
      } else {
        console.error('토큰이 없습니다:', data);
      }
    } catch (error) {
      console.error('로그인 후 처리 중 오류 발생:', error);
    }
  };

  const handleKakaoLogin = () => {
    const KAKAO_CLIENT_ID = import.meta.env.VITE_APP_KAKAO_CLIENT_ID;
    const KAKAO_REDIRECT_URI = 'http://localhost:5173/redirect.html';

    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

    const popup = window.open(kakaoAuthUrl, '_blank', 'width=500,height=600');

    if (!popup) {
      alert('팝업 차단이 활성화되어 있습니다. 팝업 차단을 해제해주세요.');
    }
  };

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === 'KAKAO_AUTH_SUCCESS') {
        const code = event.data.code;
        console.log('인증 코드 수신:', code);

        // 서버로 인증 코드 전달
        fetchAccessToken(code);
      }
    };

    // 메시지 이벤트 리스너 등록
    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const fetchAccessToken = async (code) => {
    try {
      // code를 쿼리 파라미터로 전달
      const response = await api.get(`http://localhost:5001/api/auth/kakao/callback?code=${code}`, {
        headers: {'Content-Type': 'application/json'}
      });
      const data = response.data; // api.get은 이미 JSON 데이터를 반환

      console.log('액세스 토큰:', data.token);

      // 토큰 저장
      localStorage.setItem('token', data.token);
      window.location.href = '/';
    } catch (error) {
      console.error('토큰 요청 실패:', error);
    }
  };
  return (
    <button className='sns-signup' onClick={handleKakaoLogin}>
      카카오로 시작하기
    </button>
  );
};

export default KakaoLoginButton;
