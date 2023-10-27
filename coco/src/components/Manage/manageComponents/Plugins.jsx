import React, { Suspense, useEffect, useState } from "react";
import "../Manage.css";
import { BsPlugin } from "react-icons/bs";
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

        {/* <div className="contentName">
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
        <AIcontent func={3} plugin={"task"} />

        <div className="contentName">
          <PiNumberCircleFourLight color="blue" size={23} />
          <p>Create more Efficient Code</p>
        </div>
        <AIcontent func={4} plugin={"efficient"} />

        <div className="contentName">
          <PiNumberCircleFiveLight color="blue" size={23} />
          <p>Find Similar Logic Code</p>
        </div>
        <AIcontent func={5} plugin={"similar"} /> */}

        <Suspense fallback={<Spinner />}>
          <Status resource={fetchData(API.PLUGINSTATUS)} />
        </Suspense>
      </div>
    </>
  );
};

const Status = ({ resource }) => {
  const status = resource.read();
  console.log(status);
  return (
    <>
      {status.map((plugin) => {
        return <AIcontent pluginInfo={plugin} />;
      })}
    </>
  );
};

const AIcontent = ({ pluginInfo }) => {
  const [checked, setChecked] = useState(pluginInfo.is_active);
  const [nowOn, setNowOn] = useState(
    pluginInfo.is_active ? "Plugin ON" : "Plugin OFF"
  );

  const handleChange = (e) => {
    setChecked(e.target.checked);
    if (checked == true) {
      axios
        .put(API.PLUGINSTATUS, {
          plugin: pluginInfo.plugin,
          status: 0,
        })
        .then((res) => {
          setNowOn("Plugin OFF");
        });
    } else {
      axios
        .put(API.PLUGINSTATUS, {
          plugin: pluginInfo.plugin,
          status: 1,
        })
        .then((res) => {
          setNowOn("Plugin ON");
        });
    }
  };

  const Able = () => {
    if (pluginInfo.front && pluginInfo.back) {
      // 현재 사용 가능
      return <p style={{ color: "green" }}>Now in available</p>;
    } else {
      return <p style={{ color: "red" }}>Now in disavailable</p>;
    }
  };

  const isOn = (e) => {
    if (e === 1) {
      return <span style={{ color: "rgb(0, 201, 0)" }}>사용 가능</span>;
    } else {
      return <span style={{ color: "red" }}>사용 불가능</span>;
    }
  };

  return (
    <>
      <div className="contentName">
        {checked == true ? (
          <BsPlugin color="rgb(0, 201, 0)" size={23} />
        ) : (
          <BsPlugin color="red" size={23} />
        )}

        <p style={{ textTransform: "uppercase " }}>{pluginInfo.plugin}</p>
      </div>
      <div className="pluginBody">
        <div className="top">
          {Able(pluginInfo.front && pluginInfo.back)}
          <FormGroup>
            <FormControlLabel
              disabled={!pluginInfo.front || !pluginInfo.back}
              control={<Switch defaultChecked />}
              label={nowOn}
              checked={checked}
              onChange={handleChange}
            />
          </FormGroup>
        </div>
        <div className="explain">
          <p>기능 설명 : {pluginInfo.feature_docs}</p>
          <p>현재 사용 API(Model) : {pluginInfo.base}</p>
          <p>Front-End : {isOn(pluginInfo.front)} </p>
          <p>Back-End : {isOn(pluginInfo.back)}</p>
        </div>
      </div>
    </>
  );
};
