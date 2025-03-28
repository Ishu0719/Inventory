import React from "react";
import Header from "../Component/Header/Header";
import Sidebar from "../Component/Sidebar/Sidebar";
import Suppliers from "../Suppliers/Suppliers";
import Search from "../Search/Search";

const LayoutSuppliers = () => {
  return (
    <>
      <div className="layout">
        <div className="main-container">
          <Sidebar />
          <div className="content">
            <Header className="header" />
            <Search />
            <Suppliers />
          </div>
        </div>
      </div>
    </>
  );
};
export default LayoutSuppliers;
