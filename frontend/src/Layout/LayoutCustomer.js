import React from "react";
import Header from "../Component/Header/Header";
import Sidebar from "../Component/Sidebar/Sidebar";
import Customer from "../Customer/Customer";


const LayoutCustomer = () => {
  return (
    <>
      <div className="layout">
        <div className="main-container">
          <Sidebar />
          <div className="content">
            <Header className="header" />
         
            <Customer />
          </div>
        </div>
      </div>
    </>
  );
};

export default LayoutCustomer;
