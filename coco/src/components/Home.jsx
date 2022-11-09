import React from 'react'
import './Home.css'
import {Header} from './Header'
import {Footer} from './Footer'
import { useNavigate } from 'react-router-dom'


export const Home = () => {
  const navigate = useNavigate();

  const NavigateToSignUp = () => {
    console.log("Asdf");
    navigate('/signup');
  }

  return (
    <div className="home">
      <Header/>
      <div className="homebody">
        <button onClick={NavigateToSignUp}>회원가입</button>
      </div>
      <Footer/>
    </div>
  )
}
