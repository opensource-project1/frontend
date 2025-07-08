import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CenterModal from './CenterModal';
import './record.css';

function RecordPage() {
  const [records] = useState([
    {
      id: 1,
      date: '2024-01-15',
      duration: 25,
      completed: true,
      websites: ['instagram.com', 'facebook.com']
    },
    {
      id: 2,
      date: '2024-01-14',
      duration: 30,
      completed: false,
      websites: ['youtube.com']
    },
    {
      id: 3,
      date: '2024-01-13',
      duration: 45,
      completed: true,
      websites: ['twitter.com', 'instagram.com']
    }
  ]);
  const navigate = useNavigate();

  const handleBackToMain = () => {
    navigate('/main');
  };

  const getTotalFocusTime = () => {
    return records.reduce((total, record) => total + record.duration, 0);
  };

  const getCompletedSessions = () => {
    return records.filter(record => record.completed).length;
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
          <div className="tab" onClick={() => navigate('/mypage')}>MYPAGE</div>
          <div className="tab" onClick={() => navigate('/main')}>START</div>
          <div className="tab active">RECORD</div>
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
            <div className="right-panel">
              {/* 기능 없음: 디자인만 남김 */}
            </div>
          </div>
        </div>
      </CenterModal>
    </div>
  );
}

export default RecordPage; 