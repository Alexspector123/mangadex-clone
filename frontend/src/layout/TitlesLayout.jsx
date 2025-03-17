import React from 'react'
import AdvancedSearch from "../pages/Titles/AdvancedSearch";
import { Outlet, useLocation } from 'react-router-dom';

const TitlesLayout = () => {
    const location = useLocation();
  return (
    <div>
        {location.pathname === "/titles" && <AdvancedSearch />}
        <Outlet />
    </div>
  )
}

export default TitlesLayout