import React from 'react';
import SideBar from "./SideBar/SideBar";
import TopBar from "./TopBar/TopBar";
import { Outlet } from "react-router-dom";
import "./Layout.css";
const Layout = () => {
    return (
        <div className="Layout_Admin-container">
      <div className="Admin-container">
        <div className="Header_Admin">
          <SideBar></SideBar>
        </div>
        <div className="Site_Admin_Right">
          <div className="TopBar_Admin">
            <TopBar></TopBar>
          </div>
          <div className="Noidungchinh_Admin">
            <Outlet></Outlet>
          </div>
        
        </div>
      </div>
    </div>
    );
};

export default Layout;