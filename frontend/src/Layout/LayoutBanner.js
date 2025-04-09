import React from "react";
import Header from "../Component/Header/Header";
import Sidebar from "../Component/Sidebar/Sidebar";
import Banner from "../Banner/Banner";


const LayoutBanner = () => {
  return (
    <>
      <div className="layout">
        <div className="main-container">
          <Sidebar />
          <div className="content">
            <Header className="header" />
          
            <Banner />
          </div>
        </div>
      </div>
    </>
  );
};

export default LayoutBanner;
