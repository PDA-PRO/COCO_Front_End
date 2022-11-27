import React from "react";
import { All } from "./All";
import { Free } from "./Free";
import { Help } from "./Help";
import { Notice } from "./Notice";

export const BoardBody = (props) => {
  if (props.props === 0) {
    return (
      <div>
        <Notice />
      </div>
    );
  } else if (props.props === 1) {
    return (
      <div>
        <Free />
      </div>
    );
  } else if (props.props === 2) {
    return (
      <div>
        <Help />
      </div>
    );
  } else {
    return (
      <div>
        <All />
      </div>
    );
  }
};
