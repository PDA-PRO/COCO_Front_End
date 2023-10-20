import React, { Suspense, useEffect, useState } from "react";
import "../Manage.css";
import {
  PiNumberCircleOneLight,
  PiNumberCircleTwoLight,
  PiNumberCircleThreeLight,
  PiNumberCircleFourLight,
  PiNumberCircleFiveLight,
} from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { API } from "api/config";
import fetchData from "../../../api/fetchTask";
import Spinner from "react-bootstrap/esm/Spinner";
import axios from "axios";

export const Plugins = () => {
  return (
    <>
      <h2 className="mTi">AI PLUGINS MANAGEMENT</h2>
      <div className="m-upload">
        <div className="howToUse">
          <h4>Before You Use</h4>
          <p>1. 시스템 내 AI 기능들을 확인할 수 있습니다.</p>
          <p>2. 관리자가 원하는 기능을 ON/OFF 할 수 있습니다.</p>
          <p>
            3. 플러그인의 변경 사항 관리를 통해 AI 모델 변경의 가용성을
            확보합니다.
          </p>
        </div>

        <hr />

        <div className="contentName">
        <PiNumberCircleOneLight color="blue" size={23} />
        <p>WPC : Wrong Part of Code</p>
      </div>
      <AIcontent func={1} plugin={"wpc"} />

      <div className="contentName">
        <PiNumberCircleTwoLight color="blue" size={23} />
        <p>Q&A-AI</p>
      </div>
      <AIcontent func={2} plugin={"qa"} />
      
      <div className="contentName">
        <PiNumberCircleThreeLight color="blue" size={23} />
        <p>Make own Task AI</p>
      </div>
      <AIcontent func={3} plugin={"task"}/>

      <div className="contentName">
        <PiNumberCircleFourLight color="blue" size={23} />
        <p>Create more Efficient Code</p>
      </div>
      <AIcontent func={4} plugin={"efficient"} />

      <div className="contentName">
        <PiNumberCircleFiveLight color="blue" size={23} />
        <p>Find Similar Logic Code</p>
      </div>
      <AIcontent func={5} plugin={"similar"}/>

        {/* <Suspense fallback={<Spinner />}>
          <Status resource={fetchData(API.AI + "/status")} />
        </Suspense> */}
      </div>
    </>
  );
};

const Status = ({ resource }) => {
  const status = resource.read();
  return (
    <>
      <div className="contentName">
        <PiNumberCircleOneLight color="blue" size={23} />
        <p>WPC : Wrong Part of Code</p>
      </div>
      <AIcontent func={1} plugin={"wpc"} status={status.wpc}/>

      <div className="contentName">
        <PiNumberCircleTwoLight color="blue" size={23} />
        <p>Q&A-AI</p>
      </div>
      <AIcontent func={2} plugin={"qa"} status={status.qa}/>
      
      <div className="contentName">
        <PiNumberCircleThreeLight color="blue" size={23} />
        <p>Make own Task AI</p>
      </div>
      <AIcontent func={3} plugin={"task"} status={status.task}/>

      <div className="contentName">
        <PiNumberCircleFourLight color="blue" size={23} />
        <p>Create more Efficient Code</p>
      </div>
      <AIcontent func={4} plugin={"efficient"} status={status.efficient}/>

      <div className="contentName">
        <PiNumberCircleFiveLight color="blue" size={23} />
        <p>Find Similar Logic Code</p>
      </div>
      <AIcontent func={5} plugin={"similar"} status={status.similar}/>
    </>
  );
};

const AIcontent = ({ func, plugin }) => {
  const [checked, setChecked] = useState(1);
  const [nowOn, setNowOn] = useState("Plugin ON");
  const [nowState, setNowState] = useState(1);

  // useEffect(() => {
  //   console.log(status);
  // }, [])


  const handleChange = (e) => {
    console.log(func, plugin);
    setChecked(e.target.checked);
    if (checked === true) {
      axios
        .put(API.AI + "/status", {
          plugin: plugin,
          status: 0,
        })
        .then((res) => {
          if (res.data === true) {
            setNowOn("Plugin OFF");
            setNowState(0);
          }
        });
    } else {
      axios
        .put(API.AI + "/status", {
          plugin: plugin,
          status: 1,
        })
        .then((res) => {
          if (res.data === true) {
            setNowOn("Plugin ON");
            setNowState(1);
          }
        });
    }
  };

  const Able = (e) => {
    if (e === 1) {
      // 현재 사용 가능
      return <p style={{ color: "green" }}>Now in available</p>;
    } else {
      return <p style={{ color: "red" }}>Now in disavailable</p>;
    }
  };

  const explanation = (e) => {
    if (e === 1) {
      // WPC
      return "TC 판별 중 틀린 코드에 대해, 틀린 부분을 찾아 고쳐주는 AI";
    } else if (e === 2) {
      // Q&A -AI
      return "스터디룸 Q&A에서 질문에 대한 답을 생성해주는 AI";
    } else if (e === 3) {
      // 문제 만들어주는 AI
      return "알고리즘 문제 생성 시, AI를 통해 생성해주는 AI";
    } else if (e === 4) {
      // 효율적 코드 짜기
      return "문제 풀이가 맞은 코드에 대해 판별하고, 더 좋은 효율의 코드를 만들어주는 AI";
    } else if (e === 5) {
      // 유사 로직의 코드 gathering
      return "문제 풀이가 맞은 코드에 대해, 해당 코드와 유사한 로직의 다른 코드들을 만들어 주는 AI";
    }
  };

  const nowApi = (e) => {
    if (e === 1) {
      // WPC
      return "자체 제작 WPC AI 모델";
    } else if (e === 2) {
      // Q&A -AI
      return "ChatGPT 3.5-turbo";
    } else if (e === 3) {
      // 문제 만들어주는 AI
      return "ChatGPT 3.5-turbo";
    } else if (e === 4) {
      // 효율적 코드 짜기
      return "ChatGPT 3.5-turbo";
    } else if (e === 5) {
      // 유사 로직의 코드 gathering
      return "FAISS from facebook";
    }
  };

  const isOn = (e) => {
    if (e === 1) {
      return <span style={{ color: "rgb(0, 201, 0)" }}>사용 가능</span>;
    } else {
      return <span style={{ color: "red" }}>사용 불가능</span>;
    }
  };

  console.log(checked);

  return (
    <div className="pluginBody">
      <div className="top">
        {Able(nowState)}
        <FormGroup>
          <FormControlLabel
            control={<Switch defaultChecked />}
            label={nowOn}
            checked={checked}
            onChange={handleChange}
          />
        </FormGroup>
      </div>
      <div className="explain">
        <p>기능 설명 : {explanation(func)}</p>
        <p>현재 사용 API(Model) : {nowApi(func)}</p>
        <p>Front-End : {checked === false ? isOn(0) : isOn(1)} </p>
        <p>Back-End : {checked === false ? isOn(0) : isOn(1)}</p>
      </div>
    </div>
  );
};
