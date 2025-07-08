import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CenterModal from './CenterModal';
import './record.css';

function getTodayTodos() {
  // timer.js에서 localStorage에 저장된 todayTodos를 불러옴 (없으면 예시)
  try {
    const data = JSON.parse(localStorage.getItem('todayTodos'));
    if (Array.isArray(data)) return data;
  } catch {}
  return [
    { text: '예시 할 일 1', checked: true },
    { text: '예시 할 일 2', checked: false },
    { text: '예시 할 일 3', checked: true }
  ];
}

function getTodayFocusMinutes() {
  // timer.js에서 localStorage에 저장된 focusMinutes를 불러옴 (없으면 0)
  return parseInt(localStorage.getItem('todayFocusMinutes') || '0', 10);
}

function RecordPage() {
  const navigate = useNavigate();
  const todos = getTodayTodos();
  const total = todos.length;
  const done = todos.filter(t => t.checked).length;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);
  const focusMinutes = getTodayFocusMinutes();

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
        <div className="screen-box" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{display: 'flex', flexDirection: 'row', gap: 60, alignItems: 'center', justifyContent: 'center', width: '100%', padding: 40}}>
            {/* 달성률 시각화 */}
            <div style={{background: 'rgba(255,255,255,0.95)', borderRadius: 18, padding: 36, minWidth: 260, display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 0 12px #eee'}}>
              <div style={{fontWeight: 700, fontSize: 22, marginBottom: 18, color: '#333'}}>오늘 할 일 달성률</div>
              <svg width="120" height="120" style={{marginBottom: 10}}>
                <circle r="54" cx="60" cy="60" fill="#eee" />
                <circle
                  r="54" cx="60" cy="60"
                  fill="none"
                  stroke="#ff63b9"
                  strokeWidth="10"
                  strokeDasharray={2 * Math.PI * 54}
                  strokeDashoffset={(2 * Math.PI * 54) * (1 - percent / 100)}
                  transform="rotate(-90 60 60)"
                  style={{transition: 'stroke-dashoffset 0.5s'}}
                />
                <text x="60" y="70" textAnchor="middle" fontSize="32" fontWeight="bold" fill="#333">{percent}%</text>
              </svg>
              <div style={{fontSize: 16, color: '#666', marginTop: 8}}>
                {done} / {total} 개 완료
              </div>
            </div>
            {/* 집중 시간 시각화 */}
            <div style={{background: 'rgba(255,255,255,0.95)', borderRadius: 18, padding: 36, minWidth: 260, display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 0 12px #eee'}}>
              <div style={{fontWeight: 700, fontSize: 22, marginBottom: 18, color: '#333'}}>오늘 집중 시간</div>
              <svg width="120" height="120" style={{marginBottom: 10}}>
                <circle r="54" cx="60" cy="60" fill="#eee" />
                <circle
                  r="54" cx="60" cy="60"
                  fill="none"
                  stroke="#6159ff"
                  strokeWidth="10"
                  strokeDasharray={2 * Math.PI * 54}
                  strokeDashoffset={0}
                />
                <text x="60" y="70" textAnchor="middle" fontSize="32" fontWeight="bold" fill="#333">{focusMinutes}</text>
                <text x="60" y="92" textAnchor="middle" fontSize="16" fill="#666">분</text>
              </svg>
              <div style={{fontSize: 16, color: '#666', marginTop: 8}}>
                오늘 집중 {focusMinutes}분
              </div>
            </div>
          </div>
        </div>
      </CenterModal>
    </div>
  );
}

export default RecordPage; 