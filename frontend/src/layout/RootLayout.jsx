import React, { useState } from 'react';
import Navbar from "../components/Navbar.jsx";
import { Outlet } from 'react-router-dom';
import SideBar from '../components/SideBar.jsx';

const RootLayout = () => {
  const [sidebar, setSidebar] = useState(true);

  return (
    <div className="flex h-screen">
      {sidebar && (
          <SideBar closeSidebar={() => setSidebar(false)} />
      )}

      <div className={`flex flex-col w-full transition-all duration-200 ${sidebar ? "ml-65" : "ml-0"}`}>
        <Navbar showSidebar={() => setSidebar(!sidebar)} sidebar={sidebar} />
          <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
