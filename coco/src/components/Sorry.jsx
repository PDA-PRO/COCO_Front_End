import React from "react";
import { RiErrorWarningLine } from "react-icons/ri";
export const Sorry = () => {
  return (
    <div
      className="404"
      style={{
        width: "100%",
        height: "30vh",
        display: "flex",
        flexFlow: "column nowrap",
        gap: "10px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <RiErrorWarningLine
        size={40}
        color="red"
        style={{ marginBottom: "30px", marginTop: "50px" }}
      />
      <h2 style={{ textAlign: "center", fontFamily: "GmarketSansMedium" }}>
        Sorry,
      </h2>

      <p
        style={{
          textAlign: "center",
          fontFamily: "GmarketSansMedium",
          color: "gray",
        }}
      >
        요청하시는 작업을 수행하지 못했습니다.
      </p>
    </div>
  );
};
