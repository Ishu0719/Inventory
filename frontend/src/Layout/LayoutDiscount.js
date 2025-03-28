import React from "react";
import Header from "../Component/Header/Header";
import Sidebar from "../Component/Sidebar/Sidebar";
import Discount from "../Discount/Discount";
import Search from "../Search/Search";

const LayoutDiscount = () => {
  return (
    <>
      <div className="layout">
        <div className="main-container">
          <Sidebar />
          <div className="content">
            <Header className="header" />
            <Search />
            <Discount />
          </div>
        </div>
      </div>
    </>
  );
};

export default LayoutDiscount;
