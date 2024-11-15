import React from 'react';
import './style/Mypage.style.css';
import LikePage from '../LikePage/LikePage';
import CartPage from '../CartPage/CartPage';

const MyPage = () => {
  return (
    <section className='container'>
      <div className='sub-title-wrap'>
        <h2 className='sub-title'>MY PAGE</h2>
        <div className='breadcrumb-container'>
          <ol className='breadcrumb'>
            <li className='li-title'>HOME</li>
            <li className='li-title'>MY PAGE</li>
            <li className='li-title'>정보관리</li>
            <li className='li-title active'>배송지 관리</li>
          </ol>
        </div>
      </div>

      <div className='snb_header'>
        <ul>
          <li>
            <a href='/MyPage/MyHeart'>MY</a>
          </li>
          <li>
            <a href='/MyPage/MyOrderList'>주문관리</a>
          </li>
          <li>
            <a href='/MyPage/MemberInfo'>정보관리</a>
          </li>
          <li className='active'>
            <a href='/MyPage/ProductQnaList'>문의</a>
          </li>
        </ul>
      </div>

      <div className='snb_sub'>
        <div className='inner'>
          <ul>
            <li>
              <a href='/MyPage/MyHeart'>My Like Item</a>
            </li>
            <li>
              <a href='/MyPage/MyReview'>My Review</a>
            </li>
          </ul>
          <ul>
            <li>
              <a href='/MyPage/MyOrderList'>주문/배송조회</a>
            </li>
            <li>
              <a href='/MyPage/OrderCancelMasterList'>취소/교환/반품 조회</a>
            </li>
          </ul>
          <ul>
            <li>
              <a href='/MyPage/MemberInfo'>회원정보변경</a>
            </li>
            <li>
              <a href='/MyPage/AddressBook'>배송지관리</a>
            </li>
            <li>
              <a href='/MyPage/Secession'>회원탈퇴</a>
            </li>
          </ul>
          <ul>
            <li>
              <a href='/MyPage/ProductQnaList'>상품 Q&A</a>
            </li>
            <li>
              <a href='/MyPage/MyCustomerCounseling'>1:1 문의</a>
            </li>
          </ul>
        </div>
      </div>

      <div className='user-info-section'>
        <div className='user-info-content'>
          <div className='user-profile'>
            <div className='profile-icon'>OFYOU PEOPLE</div>
          </div>
          <div className='user-message'>
            <p>
              <strong>김도현님 안녕하세요.</strong> <button className='benefit-button'>회원혜택 보기</button>
            </p>
            <p>저희와 친구하시려면 옷을 2개 구매하셔야 합니다.</p>
            <p className='date-range'>• 2024.06.15 ~ 2024.11.15 배송완료 된 주문기준</p>
          </div>
          {/* <div className='user-stats'>
            <div className='user-coupon'>
              <p>쿠폰</p>
              <p className='stat-value'>
                0<span>개</span>
              </p>
            </div>
            <div className='user-point'>
              <p>POINT</p>
              <p className='stat-value'>
                3,000<span>P</span>
              </p>
            </div>
          </div> */}
        </div>
      </div>

      <LikePage />
      <CartPage />
    </section>
  );
};

export default MyPage;
