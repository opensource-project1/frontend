import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CenterModal from './CenterModal';
import './mypage.css';

function MyPage() {
  const [userInfo] = useState({
    name: '사용자',
    email: 'user@example.com',
    totalFocusTime: 120,
    totalSessions: 5
  });
  const navigate = useNavigate();

  const handleBackToMain = () => {
    navigate('/main');
  };

  return (
    <div
      className="main-bg"
      style={{
        minHeight: '100vh',
        width: '100vw',
        backgroundImage: `url('/main_page2.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 0
      }}
    >
      <CenterModal>
        <div className="tabs">
          <div className="tab active">MYPAGE</div>
          <div className="tab" onClick={() => navigate('/main')}>START</div>
          <div className="tab" onClick={() => navigate('/record')}>RECORD</div>
        </div>
        <div className="screen-box">
          <div className="top-bar">
            <div className="window-dots">
              <span></span><span></span><span></span>
            </div>
          </div>
          <div className="tab-content active">
            <div className="left-panel">
              <button onClick={handleBackToMain} className="back-btn">
                ← 돌아가기
              </button>
            </div>
            <div className="right-panel" style={{ display: 'flex', flexDirection: 'row', gap: '24px', width: '100%', minHeight: '340px' }}>
              {/* 왼쪽: 사용자 정보 */}
              <div className="mypage-col user-info-col" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px', padding: '24px 0' }}>
                <div className="profile-avatar" style={{ width: 80, height: 80, borderRadius: '50%', background: '#eee', marginBottom: 16, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src="/farhat-altaf-ieDkvpIY_1A-unsplash.jpg" alt="프로필" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="profile-name mypage-section-title" style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 4 }}>이름</div>
                <div className="profile-email" style={{ color: '#aaa', fontSize: 14 }}>email@example.com</div>
              </div>
              {/* 가운데: 차단 사이트 목록 */}
              <div className="mypage-col blocked-sites-col" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', minHeight: '300px', padding: '24px 0' }}>
                <div className="mypage-section-title" style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 12 }}>차단 사이트 목록</div>
                <div className="blocked-sites-list" style={{ width: '100%', minHeight: 120, background: '#23202a', borderRadius: 12, padding: 16, color: '#fff', boxSizing: 'border-box' }}>
                  {/* 차단 사이트 목록이 여기에 표시됩니다. */}
                </div>
              </div>
              {/* 오른쪽: 집중 기록 */}
              <div className="mypage-col focus-records-col" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', minHeight: '300px', padding: '24px 0' }}>
                <div className="mypage-section-title" style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 12 }}>집중 기록</div>
                <div className="focus-records-list" style={{ width: '100%', minHeight: 120, background: '#23202a', borderRadius: 12, padding: 16, color: '#fff', boxSizing: 'border-box' }}>
                  {/* 집중 기록이 여기에 표시됩니다. */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CenterModal>
    </div>
  );
}

export default MyPage; 