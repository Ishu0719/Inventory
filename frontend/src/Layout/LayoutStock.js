import React from "react";
import Header from "../Component/Header/Header";
import Sidebar from "../Component/Sidebar/Sidebar";
import Stock from "../Stock/Stock"




const LayoutStocks = () => {
  return (
    <>
      <div className="layout">
        <div className="main-container">
          <Sidebar />
          <div className="content">
            <Header className="header" />
    <Stock/>
          </div>
        </div>
      </div>
    </>
  );
};

export default LayoutStocks;
