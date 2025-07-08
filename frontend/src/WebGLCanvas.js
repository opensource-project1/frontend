import React, { useEffect } from 'react';

function WebGLCanvas() {
  useEffect(() => {
    // 만약 main.js를 따로 만들었다면 여기에 import하거나 연결
    // 또는 직접 Three.js 초기화 코드 넣기
  }, []);

  return <canvas id="webgl"></canvas>;
}

export default WebGLCanvas;
