import React, {useState} from 'react';
import './style/SignupPage.style.css';
import '../../App.css';
import {useDispatch, useSelector} from 'react-redux';
import {registerUser} from '../../features/user/userSlice';
import {useNavigate} from 'react-router';

const SignupPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    emailId: '',
    emailDomain: '',
    password: '',
    passwordConfirm: '',
    name: '',
    agreements: {
      agreeAll: false,
      agree1: false,
      agree2: false,
      agree3: false
    }
  });
  const [errors, setErrors] = useState({
    emailId: '',
    emailDomain: '',
    password: '',
    passwordConfirm: '',
    name: '',
    agreements: ''
  });
  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // 전체 동의와 개별 동의 체크박스 상태 관리
  const handleAgreementChange = (e) => {
    const {name, checked} = e.target;

    // 개별 항목의 체크 상태 업데이트
    setFormData((prevData) => {
      const updatedAgreements = {
        ...prevData.agreements,
        [name]: checked
      };

      // 모든 개별 항목이 체크되면 `agreeAll`을 true로 설정, 하나라도 해제되면 false
      const allChecked = updatedAgreements.agree1 && updatedAgreements.agree2 && updatedAgreements.agree3;

      return {
        ...prevData,
        agreements: {
          ...updatedAgreements,
          agreeAll: allChecked
        }
      };
    });
  };

  const handleAgreeAllChange = (e) => {
    const {checked} = e.target;

    setFormData((prevData) => ({
      ...prevData,
      agreements: {
        agreeAll: checked,
        agree1: checked,
        agree2: checked,
        agree3: checked
      }
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.emailId) newErrors.emailId = '이메일 아이디를 입력해 주세요.';
    if (!formData.emailDomain) newErrors.emailDomain = '도메인을 입력해 주세요.';
    if (!formData.password) newErrors.password = '비밀번호를 입력해 주세요.';
    if (formData.password !== formData.passwordConfirm) newErrors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
    if (!formData.name) newErrors.name = '이름을 입력해 주세요.';

    if (!formData.agreements.agree1 || !formData.agreements.agree2 || !formData.agreements.agree3) {
      newErrors.agreements = '필수 동의 항목에 모두 동의해 주세요.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form data submitted:', formData);
      dispatch(
        registerUser({
          name: formData.name,
          email: `${formData.emailId}@${formData.emailDomain}`,
          password: formData.password,
          navigate
        })
      );
      // setFormData({
      //   emailId: '',
      //   emailDomain: '',
      //   password: '',
      //   passwordConfirm: '',
      //   name: '',
      //   agreements: {
      //     agreeAll: false,
      //     agree1: false,
      //     agree2: false,
      //     agree3: false
      //   }
      // });
      // setErrors({
      //   emailId: '',
      //   emailDomain: '',
      //   password: '',
      //   passwordConfirm: '',
      //   name: ''
      // });
    }
  };

  const handleCancel = () => {
    navigate('/login');
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
                <input
                  type='text'
                  placeholder='이메일 입력'
                  className='email-input'
                  name='emailId'
                  value={formData.emailId}
                  onChange={handleInputChange}
                />
                <span className='at-symbol'>@</span>
                <input
                  type='text'
                  placeholder='도메인 입력'
                  className='domain-input'
                  name='emailDomain'
                  value={formData.emailDomain}
                  onChange={handleInputChange}
                />
                <select
                  className='domain-select'
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      emailDomain: e.target.value
                    })
                  }>
                  <option value=''>선택</option>
                  <option value='gmail.com'>gmail.com</option>
                  <option value='naver.com'>naver.com</option>
                  <option value='hanmail.net'>hanmail.net</option>
                  <option value='nate.com'>nate.com</option>
                  <option value='daum.net'>daum.net</option>
                  <option value=''>직접입력</option>
                </select>
                {errors.emailId && <span className='warning'>{errors.emailId}</span>}
                {errors.emailDomain && <span className='warning'>{errors.emailDomain}</span>}
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-left'>
              비밀번호<span className='required'>*</span>
            </div>
            <div className='col-right'>
              <div className='password-container'>
                <input
                  type='password'
                  placeholder='영문+숫자 조합 8~16자리'
                  className='input'
                  name='password'
                  value={formData.password}
                  onChange={handleInputChange}
                />
                {errors.password && <span className='warning'>{errors.password}</span>}
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-left'>
              비밀번호 확인<span className='required'>*</span>
            </div>
            <div className='col-right'>
              <div className='password-container'>
                <input
                  type='password'
                  className='input'
                  name='passwordConfirm'
                  value={formData.passwordConfirm}
                  onChange={handleInputChange}
                />
                {errors.passwordConfirm && <span className='warning'>{errors.passwordConfirm}</span>}
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-left'>
              이름<span className='required'>*</span>
            </div>
            <div className='col-right'>
              <div className='name-container'>
                <input
                  type='text'
                  placeholder='ex) 홍길동'
                  className='input'
                  name='name'
                  value={formData.name}
                  onChange={handleInputChange}
                />
                {errors.name && <span className='warning'>{errors.name}</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='agreement-container'>
        <div className='agreement-details'>
          <label className='agreement-all'>
            <input
              type='checkbox'
              name='agreeAll'
              checked={formData.agreements.agreeAll}
              onChange={handleAgreeAllChange}
            />
            전체 동의합니다
          </label>
          {errors.agreements && <span className='warning agree'>{errors.agreements}</span>}

          <label className='agreement'>
            <input
              type='checkbox'
              name='agree1'
              checked={formData.agreements.agree1}
              onChange={handleAgreementChange}
            />
            <div className='agreement-text'>만 14세 이상입니다 (필수)</div>
          </label>
          <label className='agreement'>
            <input
              type='checkbox'
              name='agree2'
              checked={formData.agreements.agree2}
              onChange={handleAgreementChange}
            />
            <div className='agreement-text'>서비스 이용 약관에 동의합니다 (필수)</div>
          </label>
          <label className='agreement'>
            <input
              type='checkbox'
              name='agree3'
              checked={formData.agreements.agree3}
              onChange={handleAgreementChange}
            />
            <div className='agreement-text'>개인정보 처리 방침에 동의합니다 (필수)</div>
          </label>
        </div>
        <div className='center'>
          <button className='button cancel' onClick={handleCancel}>
            취소
          </button>
          <button className='button confirm' onClick={handleSubmit}>
            확인
          </button>
        </div>
      </div>
    </section>
  );
};

export default SignupPage;
