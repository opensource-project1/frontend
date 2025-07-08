import React from 'react';
import './centerModal.css';

function CenterModal({ children }) {
  return (
    <div className="center-modal-bg">
      <div className="center-modal-window">
        {children}
      </div>
    </div>
  );
}

export default CenterModal; 