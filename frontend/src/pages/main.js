import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CenterModal from './CenterModal';
import './main.css';

function MainPage() {
  const [focusMinutes, setFocusMinutes] = useState('');
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const handleTimeChange = (e) => {
    const value = parseInt(e.target.value);
    const clamped = Math.min(value, 60);
    setFocusMinutes(clamped);

    const percent = Math.max(0, (clamped / 60) * 100);
    setProgress(percent);
  };

  const saveTime = () => {
    if (!focusMinutes || isNaN(focusMinutes)) {
      alert("유효한 시간을 입력해주세요!");
      return;
    }
    localStorage.setItem('focusMinutes', focusMinutes);
    navigate('/timer');
  };

  const handleTabClick = (path) => {
    navigate(path);
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
          <div className="tab" onClick={() => handleTabClick('/mypage')}>MYPAGE</div>
          <div className="tab active">START</div>
          <div className="tab" onClick={() => handleTabClick('/record')}>RECORD</div>
        </div>
        <div className="screen-box">
          <div className="top-bar">
            <div className="window-dots">
              <span></span><span></span><span></span>
            </div>
          </div>
          <div className="tab-content active">
            <div className="left-panel">
              <div className="pill-heading">Website Block Settings</div>
              <div className="input-row">
                <input type="text" placeholder="예: www.instagram.com" />
              </div>
              <div className="pill-heading">Blocking Days</div>
              <div className="days">
                {["sun", "mon", "tue", "wed", "thu", "fri", "sat"].map(day => (
                  <React.Fragment key={day}>
                    <input type="checkbox" id={day} hidden />
                    <label htmlFor={day}>{day.toUpperCase()}</label>
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div className="right-panel">
              <div className="blocking-time-bg">
                <div className="pill-heading">Blocking Time</div>
                <input
                  type="number"
                  value={focusMinutes}
                  onChange={handleTimeChange}
                  placeholder="시간(분)"
                />
                <button onClick={saveTime}>Start</button>
                <div className="progress-container">
                  <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                </div>
                <p>{String(focusMinutes).padStart(2, '0')}:00</p>
              </div>
            </div>
          </div>
        </div>
      </CenterModal>
    </div>
  );
}

export default MainPage;
