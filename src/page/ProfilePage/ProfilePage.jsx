import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.style.css';

const ProfilePage = () => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
    const navigate = useNavigate();

    // 임시 사용자 데이터 (나중에 백엔드에서 받아올 데이터)
    const userData = {
        email: 'user@example.com',
        name: '홍길동'
    };

    const handleDeleteAccount = async () => {
        try {
            // TODO: 백엔드 연동 시 실제 회원탈퇴 API 호출
            // const response = await axios.post('/api/user/delete');

            // 백엔드 연동 전 임시 로그
            console.log('회원탈퇴 처리');

            // 첫 번째 모달 닫기
            setIsDeleteModalOpen(false);
            // 완료 모달 열기
            setIsCompleteModalOpen(true);

        } catch (error) {
            console.error('회원탈퇴 중 오류 발생:', error);
            alert('회원탈퇴 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
    };

    const handleCompleteAndRedirect = () => {
        // 로그아웃 처리
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        // 메인 페이지로 직접 이동
        navigate('/', {
            replace: true // 뒤로가기 방지
        });
    };

    return (
        <div className="profile-container">
            <h2 className="profile-title">회원정보</h2>

            <div className="profile-info-section">
                <div className="profile-info-row">
                    <label className="profile-label">아이디</label>
                    <div className="profile-value">{userData.email}</div>
                </div>

                <div className="profile-info-row">
                    <label className="profile-label">이름</label>
                    <div className="profile-value">{userData.name}</div>
                </div>
            </div>

            <div className="profile-delete-section">
                <button
                    className="profile-delete-btn"
                    onClick={() => setIsDeleteModalOpen(true)}
                >
                    회원탈퇴
                </button>
            </div>

            {/* 회원탈퇴 확인 모달 */}
            {isDeleteModalOpen && (
                <div className="profile-modal-overlay">
                    <div className="profile-modal">
                        <h3 className="profile-modal-title">회원탈퇴</h3>
                        <p className="profile-modal-message">
                            정말 탈퇴하시겠습니까?<br />
                            탈퇴 시 모든 정보가 삭제되며 복구할 수 없습니다.
                        </p>
                        <div className="profile-modal-actions">
                            <button
                                className="profile-modal-cancel"
                                onClick={() => setIsDeleteModalOpen(false)}
                            >
                                취소
                            </button>
                            <button
                                className="profile-modal-confirm"
                                onClick={handleDeleteAccount}
                            >
                                탈퇴하기
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* 회원탈퇴 완료 모달 */}
            {isCompleteModalOpen && (
                <div className="profile-modal-overlay">
                    <div className="profile-modal">
                        <h3 className="profile-modal-title">회원탈퇴 완료</h3>
                        <p className="profile-modal-message">
                            회원탈퇴가 완료되었습니다.<br />
                            그동안 이용해 주셔서 감사합니다.
                        </p>
                        <div className="profile-modal-actions">
                            <button
                                className="profile-modal-confirm"
                                onClick={handleCompleteAndRedirect}
                                style={{ width: '100%' }}
                            >
                                확인
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;