import { Link, useLocation } from 'react-router-dom';
import "./Mypagebar.style.css"

const Mypagebar = () => {
  const location = useLocation();

  return (
    <div className="mypage-sidebar">
      <h2 className="mypage-username">홍길동님❤</h2>
      <br />
      <div className="mypage-menu">
        <div className="mypage-section">
          <h3 className="mypage-section-title">주문관리</h3>
          <ul>
            <li>
              <Link to="/mypage/order"
                className={location.pathname === '/mypage/order' ? 'active' : ''}>
                주문/배송조회
              </Link>
            </li>
            <li>
              <Link to="/mypage/addresslist"
                className={location.pathname === '/mypage/addresslist' ? 'active' : ''}>
                배송지 관리
              </Link>
            </li>

          </ul>
        </div>

        <div className="mypage-section">
          <h3 className="mypage-section-title">마이페이지</h3>
          <ul>
            <li>
              <Link to="/mypage/like"
                className={location.pathname === '/mypage/like' ? 'active' : ''}>
                나의 LIKE
              </Link>
            </li>
          </ul>
        </div>

        <div className="mypage-section">
          <h3 className="mypage-section-title">정보관리</h3>
          <ul>
            <li>
              <Link to="/mypage/profile"
                className={location.pathname === '/mypage/profile' ? 'active' : ''}>
                회원정보
              </Link>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Mypagebar;