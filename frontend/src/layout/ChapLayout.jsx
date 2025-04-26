import React, { useState, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import ChapterSidebar from '../components/Chapter/ChapterSidebar';

import { motion } from 'framer-motion';

const ChapLayout = () => {
  const [sidebar, setSidebar] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const contentRef = useRef(null);

  const showSidebar = () => setSidebar(!sidebar);
  const toggleHeader = () => setShowHeader((prev) => !prev);

  return (
      <div>
          {sidebar && (
            <motion.div
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              exit={{ x: 300 }}
              transition={{ type: "spring", stiffness: 100 }}
              className='fixed right-0 top-0 
                          h-screen
                          bg-white
                          z-50'>
              <ChapterSidebar closeSidebar={() => setSidebar(false)} toggleHeader={toggleHeader}/>
            </motion.div>)}
        <div
        ref={contentRef}>
          <Outlet context={{ showSidebar, showHeader, toggleHeader }} />
        </div>
      </div>
  );
};

export default ChapLayout;
