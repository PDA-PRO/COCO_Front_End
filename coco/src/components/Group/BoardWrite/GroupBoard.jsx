import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./WriteGuel.css";
import { Header } from "../../Home/Header";
import { Footer } from "../../Home/Footer";
import { GoPencil } from "react-icons/go";
import Form from "react-bootstrap/Form";
import { useState } from "react";

import { WriteHelp } from "./WriteHelp";

export const GroupBoard = () => {
  const { state } = useLocation();
  const [title, setTitle] = useState("");

  const onTitleHandler = (e) => {
    setTitle(e.currentTarget.value);
  };

  return (
    <>
      <Header />
      <div className="writeGuel">
        <div className="WGBody">
          <div className="wG_Head">
            <GoPencil size={30} />
            <h2>Question?</h2>
          </div>
          <div className="wG_one">
            <Form.Control
              as="textarea"
              id="wG_Title"
              style={{ height: "58px" }}
              placeholder="제목을 입력해주세요"
              onChange={onTitleHandler}
            />
          </div>

          <div className="wG_two">
            <WriteHelp group_id={state} title={title} />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
