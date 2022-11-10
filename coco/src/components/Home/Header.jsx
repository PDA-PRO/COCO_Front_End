import React from 'react'
import './Home.css'
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/login');
  }
  
  return (
    <div className="navbar">
      <div className="titleLogo">
        <img src="./image/logo.png" alt=""/>
        <h2>COCO : Coding Coach</h2>
      </div>
      

      <div className="menus">
        <h3>문제</h3>
        <h3>게시판</h3>
      </div>
      <div className="login" onClick={goToLogin}>
        <h3>LOGIN</h3>
      </div>
    </div>
  )
}
