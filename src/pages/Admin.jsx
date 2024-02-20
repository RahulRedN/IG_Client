import { Outlet, useLocation } from "react-router-dom";
import Sidebar_Admin from "../components/Admin/Sidebar_Admin";
import Navbar_Admin from "../components/Admin/Navbar_Admin";

const Admin = () => {
  const { pathname } = useLocation();

  const isLink = (path) => {
    return path === pathname;
  };

  return (
      <div className="flex h-screen m-0 p-0">
        <div className="flex-[1] ">
          <Sidebar_Admin />
        </div>
        <div className="flex-[6] flex flex-col gap-y-2">
          <Navbar_Admin />
          <Outlet />
        </div>
      </div>
  );
};

export default Admin;
