import React from 'react'
import "./PBD.css"
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { FaStar } from 'react-icons/fa';
import styled from 'styled-components';
import { IoLogoPython } from "react-icons/io5";
import { BsClipboardCheck, BsArrowDownRight, BsArrowUpLeft, BsQuestionLg, BsExclamationLg } from "react-icons/bs";

export const PBD = () => {

  return (
    <div className='PBD'>

      <div className="PBD-title">
        <div className="problemsName-pbd">
          <div>No.1</div>
          <div>더하기 문제</div>
        </div>
        <div className="problemsRate-pbd">
          {Rating(2)}
        </div>
        <div className="problemsAns-pbd">54.6%</div>
      </div>

      <div className="PBD-body">
        <div className="PBD-problem">
          <div className="PBD-pbTxt">
            <div className="PBD-pbTitle">
              <BsClipboardCheck size={30}/>
              <h2>문제 설명</h2>
            </div>
            
            <p id='PBD-txt'>
              정수 2개를 입력받아 합을 출력해보자.<br/>
              단, 입력되는 정수는 -2147483648 ~ +2147483648 이다.
            </p>
          </div>

          <div className="PBD-exBox">
            <div className="PBD-exInput">
              <div className="PBD-pbTitle">
                <BsArrowDownRight size={30} color="red"/>
                <h2>Input</h2>
              </div>
            
              <p className='PBD-txt2'>
                2개의 정수가 공백으로 구분되어 입력된다.
              </p>

              <div className="PBD-pbTitle">
                <BsQuestionLg size={30} color="red"/>
                <h2>입력 예시</h2>
              </div>
            
              <p className='PBD-txt2'>
                12 45
              </p>
            </div>

            <div className="PBD-exOutput">
              <div className="PBD-pbTitle">
                <BsArrowUpLeft size={30} color="#00ff00"/>
                <h2>Output</h2>
              </div>
            
              <p className='PBD-txt2'>
                두 정수의 합을 출력한다.
              </p>

              <div className="PBD-pbTitle">
                <BsExclamationLg size={30} color="#00ff00"/>
                <h2>출력 예시</h2>
              </div>
            
              <p className='PBD-txt2'>
                57
              </p>
            </div>
          </div>
          
        </div>

        <div className="PBD-input">
          <div className="PBD-pbTitle">
            <IoLogoPython size={30} color="skyblue"/>
            <h2>코드 입력 : Python3</h2>
          </div>

          <InputGroup>
            <InputGroup.Text>CODE</InputGroup.Text>
            <Form.Control as="textarea" aria-label="With textarea" style={{"minHeight" : "700px"}}/>
          </InputGroup>

          <Button variant="outline-primary" id='submit_btn' onClick={()=> alert("제출성공!")}>SUBMIT</Button>
        </div>

      </div>

    </div>
  )
}

const ARRAY = [0, 1, 2, 3, 4];

function Rating(n) {
  const colored = [false, false, false, false, false];
  for(let i=0;i<n;i++){
    colored[i] = true;
  }
  
  return (
    <Wrap>
      <Stars>
        {ARRAY.map((el, idx) => {
          return (
            <FaStar
              key={idx}
              size="40"
              className={colored[el] && 'yellowStar'}
            />
          );
        })}
      </Stars>
    </Wrap>
  );
}

export default Rating;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 15px;
`;

const Stars = styled.div`
  display: flex;
  padding-top: 5px;

  & svg {
    color: gray;
    margin: 0 10px;
  }

  .yellowStar {
    color: #fcc419;
  }
`;