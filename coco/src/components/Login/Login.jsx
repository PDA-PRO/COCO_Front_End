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
      <Header />
      <div className="loginContainer">
        <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
          <Tab eventKey="home" title="Sign In">
            <SignIn/>
          </Tab>
          <Tab eventKey="profile" title="Sign Up">
            <SignUp/>
          </Tab>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};
