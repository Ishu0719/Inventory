import React from "react";
import Header from "../Component/Header/Header";
import Sidebar from "../Component/Sidebar/Sidebar";
import Product from "../Product/Product";


const LayoutProducts = () => {
  return (
    <>
      <div className="layout">
        <div className="main-container">
          <Sidebar />
          <div className="content">
            <Header className="header" />
            
            <Product />
          </div>
        </div>
      </div>
    </>
  );
};

export default LayoutProducts;
