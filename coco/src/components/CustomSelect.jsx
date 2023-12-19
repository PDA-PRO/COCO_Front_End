import React, { useState, useEffect } from "react";
import { API } from "api/config";
import axios from "axios";
import Select from "react-select";

export const CustomSelect = ({ onChange, defaultValue }) => {
  const [option, setOption] = useState([
    { value: null, label: "언어선택", highlighter: "c" },
  ]);
  useEffect(() => {
    axios.get(API.LANGUAGE).then((value) => {
      var new_option = [...option];
      for (let i = 0; i < value.data.length; i++) {
        new_option.push({
          value: value.data[i].id,
          label: value.data[i].name,
          highlighter: value.data[i].highlighter,
        });
      }
      return setOption(new_option);
    });
  }, []);

  return (
    <div style={{ width: "130px" }}>
      <Select
        isSearchable={false}
        options={option}
        defaultValue={
          defaultValue
            ? defaultValue
            : { value: null, label: "언어선택", highlighter: "c" }
        }
        onChange={onChange}
      />
    </div>
  );
};
