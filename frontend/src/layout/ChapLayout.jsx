import { Outlet } from 'react-router-dom';

const ChapLayout = () => {
  return (
    <div className="w-full h-full text-black">
      <Outlet />
    </div>
  );
};

export default ChapLayout;
