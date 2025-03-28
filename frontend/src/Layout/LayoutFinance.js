import React from "react";
import Header from "../Component/Header/Header";
import Sidebar from "../Component/Sidebar/Sidebar";
import Finance from "../Finance/Finance";
import Search from "../Search/Search";
const LayoutFinance = () => {
  return (
    <>
      <div className="layout">
        <div className="main-container">
          <Sidebar />
          <div className="content">
            <Header className="header" />
            <Search />
            <Finance />
          </div>
        </div>
      </div>
    </>
  );
};

export default LayoutFinance;
