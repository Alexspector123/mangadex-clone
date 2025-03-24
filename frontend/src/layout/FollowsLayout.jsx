import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const FollowsLayout = () => {
  const location = useLocation();
  return (
    <div>
        {location.pathname === "/my"}
        <Outlet />
    </div>
  )
}

export default FollowsLayout