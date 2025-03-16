import React from 'react';
import Navbar from "../components/Navbar.jsx";
import SideBar from "../components/SideBar";
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <div>
      <Navbar />
      <SideBar>
        <Outlet />
      </SideBar>
    </div>
  )
}

export default RootLayout