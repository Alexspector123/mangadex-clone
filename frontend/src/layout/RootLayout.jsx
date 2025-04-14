import React, { useState } from 'react';
import Navbar from "../components/Navbar.jsx";
import { Outlet } from 'react-router-dom';
import SideBar from '../components/SideBar.jsx';

const RootLayout = () => {
  const [sidebar, setSidebar] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden">
    <div className={`fixed lg:relative top-0 left-0 h-full bg-white transition-all duration-200
      ${sidebar ? "w-[260px]" : "w-0 overflow-hidden"}  
      ${sidebar ? "translate-x-0" : "-translate-x-full"}  
      shadow-lg lg:shadow-none z-50`}>
        {sidebar && <SideBar closeSidebar={() => setSidebar(false)} />}
      </div>

      <div className={`flex flex-col transition-all duration-200 w-full overflow-y-auto h-screen
  ${sidebar ? "lg:w-[calc(100%-260px)]" : "lg:w-full"}`}>
        <Navbar showSidebar={() => setSidebar(!sidebar)} sidebar={sidebar} />
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
