// src/MenuBar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MenuBar.css';

function MenuBar() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate('/');
  };

  return (
    <div className="menu-bar">
      <div className="menu-item">Profile</div>
      <div className="menu-item" onClick={handleSignOut}>Sign Out</div>
    </div>
  );
}

export default MenuBar;