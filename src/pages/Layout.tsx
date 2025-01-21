import { Outlet } from 'react-router-dom';

const Layout = () => {
  // throw new Error('This is a forced error for testing purposes.');

  return (
    <div>
      <div>Layout</div>
      <Outlet />
    </div>
  );
};

export default Layout;
