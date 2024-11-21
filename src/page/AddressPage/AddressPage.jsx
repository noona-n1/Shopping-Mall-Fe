import React, { useState } from "react";
import DaumPostcode from 'react-daum-postcode';
import "./AddressPage.style.css";


const AddressPage = () => {
  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  // 초기 formData 상태
  const initialFormData = {
    id: null,
    name: '',
    zipCode: '',
    address: '',
    detailAddress: '',
    phone: '',
    isDefault: false
  };

  // 폼 데이터 상태
  const [formData, setFormData] = useState(initialFormData);

  // 임시로 localStorage 사용 (나중에 백엔드 연동 시 대체될 부분)
  const [addresses, setAddresses] = useState(() => {
    const savedAddresses = localStorage.getItem('addresses');
    return savedAddresses ? JSON.parse(savedAddresses) : [];
  });

  // 상태 초기화 함수
  const resetAllStates = () => {
    setFormData(initialFormData);
    setSelectedAddress(null);
    setIsAddressModalOpen(false);
    setIsPostcodeOpen(false);
  };

  // 주소 선택 핸들러 (우편번호 서비스)
  const handlePostcodeComplete = (data) => {
    setFormData(prev => ({
      ...prev,
      zipCode: data.zonecode,
      address: data.address
    }));
    setIsPostcodeOpen(false);
  };

  // 주소 수정 버튼 핸들러
  const handleEditClick = (address) => {
    resetAllStates(); // 먼저 모든 상태 초기화
    setSelectedAddress(address);
    setFormData({
      id: address.id,
      name: address.name,
      zipCode: address.zipCode,
      address: address.address,
      detailAddress: address.detailAddress,
      phone: address.phone,
      isDefault: address.isDefault
    });
    setIsAddressModalOpen(true);
  };

  // 새 배송지 등록 버튼 핸들러
  const handleAddClick = () => {
    resetAllStates(); // 모든 상태 초기화
    setIsAddressModalOpen(true);
  };

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    resetAllStates();
  };

  // 주소 저장 핸들러
  const handleSaveAddress = (e) => {
    e.preventDefault();

    const updatedAddresses = [...addresses];

    // 기본 배송지 처리
    if (formData.isDefault) {
      updatedAddresses.forEach(addr => {
        addr.isDefault = false;
      });
    }

    if (formData.id) {
      // 수정
      const index = updatedAddresses.findIndex(addr => addr.id === formData.id);
      if (index !== -1) {
        updatedAddresses[index] = formData;
      }
    } else {
      // 새로 추가
      updatedAddresses.push({
        ...formData,
        id: Date.now()
      });
    }

    // 상태 업데이트
    setAddresses(updatedAddresses);

    // localStorage 업데이트
    localStorage.setItem('addresses', JSON.stringify(updatedAddresses));

    // 모달 닫기 및 상태 초기화
    resetAllStates();
  };

  return (
    <div className="address-page-container">
      <h2 className="address-page-title">배송지 관리</h2>

      {/* 배송지 목록 */}
      {addresses.map((address) => (
        <div key={address.id} className="address-page-item">
          <div className="address-page-item-info">
            <div className="address-page-item-header">
              <span className="address-page-item-name">{address.name}</span>
              {address.isDefault && (
                <span className="address-page-item-badge">기본배송지</span>
              )}
            </div>
            <p className="address-page-item-address">
              [{address.zipCode}] {address.address}, {address.detailAddress}
            </p>
            <p className="address-page-item-phone">{address.phone}</p>
          </div>
          <div className="address-page-item-actions">
            <button
              className="address-page-edit-btn"
              onClick={() => handleEditClick(address)}
            >
              수정
            </button>
            <button
              className="address-page-delete-btn"
              onClick={() => {/* 삭제 로직 */ }}
            >
              삭제
            </button>
          </div>
        </div>
      ))}

      {/* 새 배송지 추가 버튼 */}
      <div className="address-page-add-wrapper">
        <button
          className="address-page-add-btn"
          onClick={handleAddClick}
        >
          배송지 등록
        </button>
      </div>

      {/* 배송지 등록/수정 모달 */}
      {isAddressModalOpen && (
        <div className="address-page-modal-overlay">
          <div className="address-page-modal">
            <h3 className="address-page-modal-title">
              {selectedAddress ? '배송지 수정' : '배송지 등록'}
            </h3>
            <form onSubmit={handleSaveAddress} className="address-page-form">
              <div className="address-page-form-row">
                <label className="address-page-form-label">
                  배송지명<span className="address-page-required">*</span>
                </label>
                <input
                  type="text"
                  className="address-page-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="배송지명을 입력해주세요"
                />
              </div>

              <div className="address-page-form-row">
                <label className="address-page-form-label">
                  주소<span className="address-page-required">*</span>
                </label>
                <div className="address-page-address-wrapper">
                  <div className="address-page-postcode-row">
                    <input
                      type="text"
                      className="address-page-input address-page-postcode"
                      value={formData.zipCode}
                      placeholder="우편번호"
                      readOnly
                    />
                    <button
                      type="button"
                      className="address-page-postcode-btn"
                      onClick={() => setIsPostcodeOpen(true)}
                    >
                      우편번호 찾기
                    </button>
                  </div>
                  <input
                    type="text"
                    className="address-page-input"
                    value={formData.address}
                    placeholder="도로명 주소"
                    readOnly
                  />
                  <input
                    type="text"
                    className="address-page-input"
                    value={formData.detailAddress}
                    onChange={(e) => setFormData({ ...formData, detailAddress: e.target.value })}
                    placeholder="상세 주소"
                  />
                </div>
              </div>

              <div className="address-page-form-row">
                <label className="address-page-form-label">
                  연락처<span className="address-page-required">*</span>
                </label>
                <input
                  type="text"
                  className="address-page-input"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="연락처를 입력해주세요"
                />
              </div>

              <div className="address-page-form-row">
                <label className="address-page-checkbox">
                  <input
                    type="checkbox"
                    checked={formData.isDefault}
                    onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                  />
                  <span>기본 배송지로 설정</span>
                </label>
              </div>

              <div className="address-page-modal-actions">
                <button
                  type="button"
                  className="address-page-cancel-btn"
                  onClick={handleCloseModal}
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="address-page-submit-btn"
                >
                  저장
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 우편번호 검색 모달 */}
      {isPostcodeOpen && (
        <div className="address-page-modal-overlay">
          <div className="address-page-postcode-modal">
            <div className="address-page-modal-header">
              <h3 className="address-page-modal-title">우편번호 찾기</h3>
              <button
                className="address-page-modal-close"
                onClick={() => setIsPostcodeOpen(false)}
              >
                ✕
              </button>
            </div>
            <DaumPostcode onComplete={handlePostcodeComplete} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressPage;
