import React, { useState } from 'react';
import Navbar from "../components/Navbar.jsx";
import { Outlet } from 'react-router-dom';
import SideBar from '../components/SideBar.jsx';

const RootLayout = () => {
  const [sidebar, setSidebar] = useState(true);

  return (
    <div className="flex h-screen">
      <div className={`transition-all duration-200 ${sidebar ? "w-[260px]" : "w-0"} overflow-hidden`}>
        {sidebar && <SideBar closeSidebar={() => setSidebar(false)} />}
      </div>

      <div className={`flex flex-col transition-all duration-200 ${sidebar ? "w-[calc(100%-260px)] ml-[260px]" : "w-full ml-0"}`}>
        <Navbar showSidebar={() => setSidebar(!sidebar)} sidebar={sidebar} />
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
