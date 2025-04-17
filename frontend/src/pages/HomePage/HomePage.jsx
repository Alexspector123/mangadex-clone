import Home from './Home';
import Latest from './Latest';
import SelfPublish from './SelfPublish';
import RecentAdded from './RecentAdded';

import React from 'react'

import 'swiper/css';
import 'swiper/css/navigation';

const HomePage = () => {

  return (
    <div>
      <Home />
      <div className="px-6 my-8 max-w-[1440px] mx-auto">
        <Latest />
        <SelfPublish />
        <RecentAdded />
      </div>
    </div>
  )
}

export default HomePage