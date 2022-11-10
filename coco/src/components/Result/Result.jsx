import React from 'react'
import { useNavigate } from "react-router-dom";
import { Footer } from '../Home/Footer'
import { Header } from '../Home/Header'
import { IoLogoPython, IoClose, IoRadioButtonOffSharp } from "react-icons/io5";
import "./Result.css"
import { RiEmotionLaughLine, RiEmotionSadLine } from "react-icons/ri";



export const Result = () => {
  const navigate = useNavigate();
  const whatResult = (e) => {
    if(e===1){
      return <RiEmotionLaughLine size={40} color="#6666ff" />
    }
    else{
      return <RiEmotionSadLine size={40} color="red" />
    }
  }
  return (
    <>
      <Header/>
      <div className="Res-Body">
        <div className="Res-yourCode">
          <div className="Res-pbTitle">
            <IoLogoPython size={40} color="skyblue" />
            <h2>My Code</h2>
          </div>
          <div className="Res-code">
            <p id='R-Code'></p>
          </div>
        </div>

        <div className="Res-others">
          <div className="Res-pbTitle">
            {/* <IoLogoPython size={30} color="skyblue" /> */}
            <img src="/image/logo.png" alt="" height="40px"/>
            <h2>채점 결과 :</h2>
            {whatResult(1)}
          </div>

          <h3 id='Res-out' onClick={()=>navigate("/problems")}>문제 목록으로..</h3>
        </div>
      </div>
      <Footer/>
    </>
  )
}
