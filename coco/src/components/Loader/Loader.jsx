import React from "react";
import Spinner from "react-bootstrap/Spinner";

export const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "30vh",
        width: "100%",
      }}
    >
      <Spinner animation="border" variant="primary" />
    </div>
  );
};
// how to center a div?

//Source: https://stackoverflow.com/questions/42125775
