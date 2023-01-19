import React, { Suspense, useState } from "react";
import { Header } from "../Home/Header";
import { Footer } from "../Home/Footer";
import "./StatusList.css";
import { StatusListBox } from "./StatusListBox";
import Spinner from "react-bootstrap/Spinner";
import fetchData from "../../api/fetchTask";
import { useLocation } from "react-router-dom";
import Pagination from "@mui/material/Pagination";

export const StatusList = () => {
  const location = useLocation();
  console.log(location.state);
  return (
    <div>
      <Header />
      <div className="statusListContainer">
        <div className="statusListTop">
          <img src="./image/score.png" height="80px" alt="" />
          <h4>COCO SCORE BOARD</h4>
        </div>
        <div className="statusListBox" id="SLBtop">
          <div>Submit No.</div>
          <div>User ID</div>
          <div>문제 ID</div>
          <div>문제</div>
          <div>결과</div>
          <div>제출시간</div>
        </div>
        <Suspense fallback={<Spinner />}>
          <Getsubmits
            resource={
              location.state == null
                ? fetchData(`http://127.0.0.1:8000/status`)
                : fetchData(
                    `http://127.0.0.1:8000/status?user_id=${location.state.user_id}`
                  )
            }
          />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
};

const Getsubmits = ({ resource }) => {
  const problemList = resource.read();
  const maxPage = Math.ceil(problemList.length / 10);
  const [page, setPage] = useState(1);

  const handlePage = (event) => {
    if (
      event.target.innerHTML ===
      '<path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>'
    ) {
      setPage(page - 1);
    } else if (
      event.target.innerHTML ===
      '<path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>'
    ) {
      setPage(page + 1);
    } else {
      setPage(parseInt(event.target.outerText));
    }
  };

  return (
    <>
      {problemList.slice(20 * (page - 1), 20 * (page - 1) + 20).map((e) => {
        return <StatusListBox info={e} key={e.sub_id} />;
      })}
      <div className="pageController">
        <Pagination
          count={maxPage}
          variant="outlined"
          shape="rounded"
          defaultPage={1}
          onChange={(e) => handlePage(e)}
        />
      </div>
    </>
  );
};
