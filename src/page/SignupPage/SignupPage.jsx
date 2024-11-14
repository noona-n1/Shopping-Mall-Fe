import React, {useState} from 'react';
import './style/SignupPage.style.css';

const SignupPage = () => {
  const [agreeAll, setAgreeAll] = useState(false);
  const [agreements, setAgreements] = useState({
    agree1: false,
    agree2: false,
    agree3: false
  });

  const handleAgreeAllChange = (e) => {
    const checked = e.target.checked;
    setAgreeAll(checked);
    setAgreements({
      agree1: checked,
      agree2: checked,
      agree3: checked
    });
  };

  const handleAgreementChange = (e) => {
    const {name, checked} = e.target;
    setAgreements((prev) => ({...prev, [name]: checked}));

    if (!checked) {
      setAgreeAll(false);
    } else if (Object.values({...agreements, [name]: checked}).every(Boolean)) {
      setAgreeAll(true);
    }
  };
  return (
    <section className='container'>
      <div className='sub-title-wrap'>
        <p className='sub-title'>Join Member</p>
      </div>
      <p className='table-notice'>
        <span className='required'>*</span>필수 입력 항목
      </p>
      <div className='member-join'>
        <div className='strong'>회원가입하면 엄청난 혜택을 드려요</div>

        <div className='grid-table'>
          <div className='row'>
            <div className='col-left'>
              이메일 아이디<span className='required'>*</span>
            </div>
            <div className='col-right'>
              <div className='email-container'>
                <input type='text' placeholder='이메일 입력' className='email-input' />
                <span className='at-symbol'>@</span>
                <input type='text' placeholder='도메인 입력' className='domain-input' />
                <select className='domain-select'>
                  <option>선택</option>
                  <option>gmail.com</option>
                  <option>naver.com</option>
                  <option>hanmail.net</option>
                  <option>nate.com</option>
                  <option>daun.net</option>
                  <option>직접입력</option>
                </select>
                <span className='email-warning'>본인 소유의 이메일을 입력해 주세요.</span>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-left'>
              비밀번호<span className='required'>*</span>
            </div>
            <div className='col-right'>
              <input type='text' placeholder='영문+숫자 조합 8~16자리' className='input' />
            </div>
          </div>
          <div className='row'>
            <div className='col-left'>
              비밀번호 확인<span className='required'>*</span>
            </div>
            <div className='col-right'>
              <input type='text' className='input' />
            </div>
          </div>
          <div className='row'>
            <div className='col-left'>
              이름<span className='required'>*</span>
            </div>
            <div className='col-right'>
              <input type='text' placeholder='ex) 홍길동' className='input' />
            </div>
          </div>
        </div>
      </div>
      <div className='agreement-container'>
        <div className='agreement-details'>
          <label className='agreement-all'>
            <input type='checkbox' checked={agreeAll} onChange={handleAgreeAllChange} />
            전체 동의합니다
          </label>
          <label className='agreement-all-content'>
            <p>전체동의는 필수 및 선택정보에 대한 동의도 포함되어 있으며, 개별적으로도 동의를 선택하실 수 있습니다.</p>
            선택항목에 대한 동의를 거부하는 경우에도 회원가입 서비스는 이용 가능합니다.
          </label>
          <label className='agreement'>
            <input type='checkbox' name='agree1' checked={agreements.agree1} onChange={handleAgreementChange} />
            <div class='agreement-text'>만 14세 이상입니다 (필수)</div>
            <button class='btn-detail'>내용보기</button>
          </label>
          <label className='agreement'>
            <input type='checkbox' name='agree2' checked={agreements.agree2} onChange={handleAgreementChange} />
            <div class='agreement-text'>서비스 이용 약관에 동의합니다 (필수)</div>

            <button class='btn-detail'>내용보기</button>
          </label>
          <label className='agreement'>
            <input type='checkbox' name='agree3' checked={agreements.agree3} onChange={handleAgreementChange} />
            <div class='agreement-text'>개인정보 처리 방침에 동의합니다 (필수)</div>

            <button class='btn-detail'>내용보기</button>
          </label>
        </div>
      </div>

      <button class='button cancel'>취소</button>
      <button class='button confirm'>확인</button>
    </section>
  );
};

export default SignupPage;
