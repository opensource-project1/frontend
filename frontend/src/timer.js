import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CenterModal from './CenterModal';
import './timer.css';

function TimerPage() {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const navigate = useNavigate();
  const [todoInput, setTodoInput] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const savedTime = localStorage.getItem('focusMinutes');
    if (savedTime) {
      setTimeLeft(parseInt(savedTime) * 60);
    }
  }, []);

  useEffect(() => {
    let interval = null;
    if (isRunning && !isPaused && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      const sessionMinutes = parseInt(localStorage.getItem('focusMinutes') || '0', 10);
      const prev = parseInt(localStorage.getItem('todayFocusMinutes') || '0', 10);
      localStorage.setItem('todayFocusMinutes', String(prev + sessionMinutes));
      alert('집중 시간이 완료되었습니다!');
    }
    return () => clearInterval(interval);
  }, [isRunning, isPaused, timeLeft]);

  const startTimer = () => {
    if (timeLeft > 0) {
      setIsRunning(true);
      setIsPaused(false);
    }
  };

  const pauseTimer = () => {
    setIsPaused(!isPaused);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsPaused(false);
    const savedTime = localStorage.getItem('focusMinutes');
    if (savedTime) {
      setTimeLeft(parseInt(savedTime) * 60);
    }
  };

  const handleEmergencyStop = () => {
    setIsRunning(false);
    setIsPaused(false);
    setTimeLeft(0);
    alert('집중이 긴급 중지되었습니다!');
    navigate('/main');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleBackToMain = () => {
    navigate('/main');
  };

  const handleTodoInputChange = (e) => {
    setTodoInput(e.target.value);
  };

  const handleTodoInputKeyDown = (e) => {
    if (e.key === 'Enter' && todoInput.trim()) {
      setTodos([...todos, { text: todoInput.trim(), checked: false }]);
      setTodoInput('');
      e.preventDefault();
    }
  };

  const handleTodoCheck = (idx) => {
    setTodos(todos.map((todo, i) => i === idx ? { ...todo, checked: !todo.checked } : todo));
  };

  const handleTodoDelete = (idx) => {
    setTodos(todos.filter((_, i) => i !== idx));
  };

  // 할 일 목록이 바뀔 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem('todayTodos', JSON.stringify(todos));
  }, [todos]);

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
          <div className="tab" onClick={() => navigate('/record')}>RECORD</div>
          <div className="tab active">TIMER</div>
        </div>
        <div className="screen-box">
          <div className="top-bar">
            <div className="window-dots">
              <span></span><span></span><span></span>
            </div>
          </div>
          <div className="tab-content active" style={{ display: 'flex', flexDirection: 'row', gap: '200px' }}>
            <div className="left-panel" style={{ flex: 1, minWidth: 0, paddingLeft: 48 }}>
              <div className="pill-heading" style={{ marginTop: 64, marginBottom: 4 }}>오늘 할 일</div>
              <button onClick={handleEmergencyStop} className="emergency-btn stop-button" style={{position: 'fixed', right: 40, bottom: 40, background: '#ff4d4f', color: '#fff', fontWeight: 'bold', borderRadius: 8, padding: '16px 36px', fontSize: 20, border: 'none', cursor: 'pointer', zIndex: 100, boxShadow: '0 2px 12px rgba(255,77,79,0.18)'}}>긴급 중지</button>
              <input
                type="text"
                value={todoInput}
                onChange={handleTodoInputChange}
                onKeyDown={handleTodoInputKeyDown}
                placeholder="오늘 할 일을 한 개씩 입력하고 Enter를 누르세요!"
                style={{ width: '100%', borderRadius: 10, border: '1px solid #ffb0d2', padding: 12, fontSize: 16, background: '#23202a', color: '#fff', marginBottom: 16 }}
              />
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {todos.map((todo, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                    <input
                      type="checkbox"
                      checked={todo.checked}
                      onChange={() => handleTodoCheck(idx)}
                      style={{ marginRight: 8 }}
                    />
                    <span style={{ textDecoration: todo.checked ? 'line-through' : 'none', color: todo.checked ? '#aaa' : '#fff', flex: 1 }}>{todo.text}</span>
                    <button onClick={() => handleTodoDelete(idx)} style={{ marginLeft: 0, background: 'none', border: 'none', color: '#ffb0d2', fontWeight: 'bold', fontSize: 18, cursor: 'pointer' }} title="삭제">×</button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="right-panel" style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 0, position: 'relative', background: 'none' }}>
              <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 0 20px #eee', padding: '36px 24px', width: '100%', maxWidth: 400, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', marginTop: 32 }}>
                <div className="pill-heading">집중 타이머</div>
                <div className="timer-area" style={{ width: '100%', gap: 32, alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                  <div className="timer-circle-block" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                    <div className="timer-display" style={{ marginBottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div className="time" style={{ fontSize: 36, fontWeight: 'bold', marginBottom: 16 }}>{formatTime(timeLeft)}</div>
                      <div className="progress-ring">
                        <svg width="180" height="180">
                          <circle
                            cx="90"
                            cy="90"
                            r="70"
                            stroke="#ddd"
                            strokeWidth="8"
                            fill="none"
                          />
                          <circle
                            cx="90"
                            cy="90"
                            r="70"
                            stroke="#ff5bdb"
                            strokeWidth="8"
                            fill="none"
                            strokeDasharray={`${2 * Math.PI * 70}`}
                            strokeDashoffset={`${2 * Math.PI * 70 * (1 - timeLeft / (parseInt(localStorage.getItem('focusMinutes') || 0) * 60))}`}
                            transform="rotate(-90 90 90)"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="timer-controls" style={{ width: '100%', justifyContent: 'center', display: 'flex', flexDirection: 'row', gap: 18 }}>
                    {!isRunning ? (
                      <>
                        <div style={{ flex: 1 }} />
                      </>
                    ) : (
                      <>
                        <div className="control-buttons">
                          <button onClick={pauseTimer} className="pause-btn">
                            {isPaused ? '재개' : '일시정지'}
                          </button>
                          <button onClick={resetTimer} className="reset-btn">
                            리셋
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                  {!isRunning && (
                    <button
                      onClick={startTimer}
                      className="start-btn"
                      style={{ marginTop: 45, alignSelf: 'center', width: '70%', maxWidth: 220, background: 'linear-gradient(to bottom, #ff82d3, #d79bff)', color: '#fff', border: 'none' }}
                    >
                      시작
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CenterModal>
    </div>
  );
}

export default TimerPage; 