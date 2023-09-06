import React from "react";
import "./SignUp.css";
import { Header } from "../Home/Header";
import { Footer } from "../Home/Footer";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";

export const Login = () => {
  return (
    <div>
      <Header props={1} />
      <div className="loginWhole">
        <div className="loginContainer">
          <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
            <Tab eventKey="home" title="로그인" className="loginTab">
              <SignIn />
            </Tab>
            <Tab eventKey="profile" title="회원가입" className="loginTab">
              <SignUp />
            </Tab>
          </Tabs>
        </div>
        <div className="loginImg"></div>
      </div>
      <Footer props={1} />
    </div>
  );
};
