import Home from './Home';
import Latest from './Latest';
import SelfPublish from './SelfPublish';

import React from 'react'

import { FiArrowRight } from "react-icons/fi";

import 'swiper/css';
import 'swiper/css/navigation';

const HomePage = () => {

  return (
    <div>
      <Home />
      <div className="px-4 my-8 max-w-[1440px] mx-auto">
        <Latest />
        <SelfPublish />

        <div>
          <div className='flex justify-between items-center mb-4'>
            <h2 className='z-2 min-[1448px]:text-4xl font-semibold sm:text-2xl text-xl font-spartan'>Recently Added</h2>
            <FiArrowRight className='z-2 min-[1448px]:text-4xl font-semibold sm:text-2xl text-xl font-spartan' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage