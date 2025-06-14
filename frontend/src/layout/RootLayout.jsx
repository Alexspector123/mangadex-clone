import React, { useState, useRef } from 'react';
import Navbar from "../components/Navbar.jsx";
import { Outlet } from 'react-router-dom';
import SideBar from '../components/SideBar.jsx';
import { SidebarContext } from "../contexts/SidebarContext.js";

const RootLayout = () => {
  const [sidebar, setSidebar] = useState(true);
  const contentRef = useRef(null);

  return (
    <SidebarContext.Provider value={{ sidebar, setSidebar }}>
    <div className="flex h-screen overflow-hidden">
      <div className={`fixed lg:relative top-0 left-0 h-full bg-white transition-all duration-200
        ${sidebar ? "w-[260px]" : "w-0 overflow-hidden"}  
        ${sidebar ? "translate-x-0" : "-translate-x-full"}
        shadow-lg lg:shadow-none z-50`}>
          {sidebar && <SideBar closeSidebar={() => setSidebar(false)} />}
      </div>

      <div
      ref={contentRef} 
      className={`flex flex-col transition-all duration-200 w-full overflow-y-auto h-screen
  ${sidebar ? "lg:w-[calc(100%-260px)]" : "lg:w-full"}`}>
        <Navbar showSidebar={() => setSidebar(!sidebar)} sidebar={sidebar} scrollContainer={contentRef} />
        <Outlet />
      </div>
    </div>
  </SidebarContext.Provider>
  );
};

export default RootLayout;
