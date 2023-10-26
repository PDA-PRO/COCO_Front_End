import React from "react";
import { BiError } from "react-icons/bi";

export const Notfound = () => {
  return (
    <div
      className="404"
      style={{
        width: "100%",
        height: "46vh",
        display: "flex",
        flexFlow: "column nowrap",
        gap: "10px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <BiError
        size={50}
        color="red"
        style={{ marginBottom: "30px", marginTop: "50px" }}
      />
      <h2 style={{ textAlign: "center", fontFamily: "GmarketSansMedium" }}>
        Sorry,
      </h2>
      <h4
        style={{
          textAlign: "center",
          fontFamily: "GmarketSansMedium",
          color: "red",
        }}
      >
        {" "}
        404 NOT FOUND
      </h4>
      <p
        style={{
          textAlign: "center",
          fontFamily: "GmarketSansMedium",
          color: "gray",
        }}
      >
        요청하시는 페이지가 존재하지 않습니다.
      </p>
    </div>
  );
};
