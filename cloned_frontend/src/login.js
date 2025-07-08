import React from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    alert('구글 로그인(프론트엔드 데모)');
    navigate('/main');
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      backgroundImage: `url('/main_page2.png')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',

      // ✅ 정중앙 정렬
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <button onClick={handleGoogleLogin} style={{
        padding: '18px 40px',
        background: '#fff',
        color: '#444',
        border: '2px solid #ff63b9',
        borderRadius: 40,
        fontWeight: 700,
        fontSize: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        boxShadow: '0 2px 8px rgba(255,99,185,0.08)'
      }}>
        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="구글" style={{ width: 28, height: 28 }} />
        구글로 로그인
      </button>
    </div>
  );
}

export default LoginPage;
