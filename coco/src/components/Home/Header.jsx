import React from 'react'
import './Home.css'
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  return (
    <div className="navbar">
      <h2>COCO : Coding Coach</h2>

      <div className="menus">
        <h3>문제</h3>
        <h3>게시판</h3>
      </div>

      <div className="login">
        <h3>LOGIN</h3>
      </div>
    </div>
  )
}
