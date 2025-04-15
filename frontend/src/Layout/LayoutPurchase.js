import React from "react";
import Header from "../Component/Header/Header";
import Sidebar from "../Component/Sidebar/Sidebar";
import Purchase from "../Purchase/Purchase";


const LayoutPurchase = () => {
  return (
    <>
      <div className="layout">
        <div className="main-container">
          <Sidebar />
          <div className="content">
            <Header className="header" />
            
            <Purchase />
          </div>
        </div>
      </div>
    </>
  );
};

export default LayoutPurchase;
