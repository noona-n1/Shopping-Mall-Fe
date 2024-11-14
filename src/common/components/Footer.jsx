import React from "react";
import "./Footer.style.css";

const Footer = () => {
    return (
        <footer className="footer-container">

            <div className="footer-links-wrapper">

                <div className="footer-links">
                    <a href="#company">회사소개</a>
                    <a href="#consulting">입점상담</a>
                    <a href="#inquiry">제휴문의</a>
                    <a href="#terms">이용약관</a>
                    <a href="#privacy">개인정보처리방침</a>
                    <a href="#customer">고객센터</a>
                    <a href="#recruit">채용정보</a>
                    <a href="#global">GLOBAL</a>
                </div>
            </div>
            <div className="footer-content">
                <div className="footer-info">
                    <p>
                        상호명 : 오브유코리아 | 공동 대표자 : 김도현, 장명진, 정송희, 석민영  | 주소 : 서울특별시 강남구 영동대로 123 <br />
                        사업자등록번호 : 123-45-67890 | 통신판매업신고 : 제0000-서울강남-00000호

                    </p>
                    <p>
                        COPYRIGHT ⓒ 오브유코리아 ALL RIGHTS RESERVED
                    </p>
                </div>
                <div className="footer-consumer">
                    <p>
                        <strong>소비자피해보상보험</strong><br />
                        고객님은 안전거래를 위해 현금 결제 시, 오브유코리아에서 가입한 소비자피해보상보험
                        서비스를 이용하실 수 있습니다.
                    </p>

                </div>
            </div>
        </footer>
    );
};

export default Footer;