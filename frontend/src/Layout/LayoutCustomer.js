import React from "react";
import Header from "../Component/Header/Header";
import Sidebar from "../Component/Sidebar/Sidebar";
import Customer from "../Customer/Customer";
import Search from "../Search/Search";

const LayoutCustomer = () => {
  return (
    <>
      <div className="layout">
        <div className="main-container">
          <Sidebar />
          <div className="content">
            <Header className="header" />
            <Search />
            <Customer />
          </div>
        </div>
      </div>
    </>
  );
};

export default LayoutCustomer;
