import { FC } from "react";
import { Outlet } from "react-router-dom";

const MainLayout: FC = () => {
  return (
    <>
      <header> header </header>
      <Outlet />
      <footer>footer</footer>
    </>
  );
};

export default MainLayout;
