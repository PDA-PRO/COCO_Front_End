import React from 'react'
import './Home.css'
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

export const Header = () => {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.loginState);


  const movdPage = (n) => {
    switch(n){
      case 1:
        navigate("/");
        break;
      case 2:
        navigate('/problems');
        break;
      case 3:
        break;
      case 4:
        navigate('/login');
        break;
    }
  }

  
  return (
    <div className="navbar">
      <h2 onClick={() => movdPage(1)}>COCO : Coding Coach</h2>
      <div className="menus">
        <h3 onClick={() => movdPage(2)}>문제</h3>
        <h3 onClick={() => movdPage(3)}>게시판</h3>
      </div>
      <div className="login" onClick={() => movdPage(4)}>
        <h3>LOGIN</h3>
      </div>
    </div>
  )
}
