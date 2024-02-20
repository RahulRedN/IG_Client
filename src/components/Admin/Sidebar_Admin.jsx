import logo from "../../../public/images/IG_logo_Dark.png";
import { Gauge, UserCog, Building, ClipboardCheck, Star } from "lucide-react";
import { RiQuestionnaireLine } from "react-icons/ri";
import { IoIosPeople } from "react-icons/io";
import { VscSignOut } from "react-icons/vsc";
import styles from "./Sidebar_Admin.module.css";
import { NavLink } from "react-router-dom";

const Sidebar_Admin = () => {
  return (
    <div className="fixed w-52 top-0 h-full">
      <div className="flex items-center justify-center h-20">
        <img src={logo} className="h-12 w-14" />
        <h1 className="font-bold">InspiringGo</h1>
      </div>
      <div className="flex flex-col justify-between">
        <>
          <h1 className="ml-2 text-sm">Menu</h1>

          <NavLink
            to="home"
            style={({ isActive }) =>
              isActive
                ? {
                    background: "rgb(239 246 255)",
                    borderRadius: 5,
                    color: "rgb(59 130 246)",
                  }
                : {}
            }
            className={
              "mt-2 flex items-center gap-x-2 text-gray-500 ml-2 pl-3 px-2 py-3 rounded-md " +
              styles.box
            }
          >
            <Gauge size={17} className={styles.inicon} />
            <h1 className={"text-sm " + styles.intext}>Dashboard</h1>
          </NavLink>

          <h1 className="mt-3 ml-2 text-sm">Users</h1>

          <NavLink
            to="jobseekers"
            style={({ isActive }) =>
              isActive
                ? {
                    background: "rgb(239 246 255)",
                    borderRadius: 5,
                    color: "rgb(59 130 246)",
                  }
                : {}
            }
            className={
              "mt-2 flex items-center gap-x-2 text-gray-500 ml-2 pl-3 px-2 py-3 rounded-md " +
              styles.box
            }
          >
            <UserCog size={17} className={"text-inherit " + styles.inicon} />

            <h1 className={"text-sm text-inherit " + styles.intext}>
              JobSeeker
            </h1>
          </NavLink>

          <NavLink
            to="companys"
            style={({ isActive }) =>
              isActive
                ? {
                    background: "rgb(239 246 255)",
                    borderRadius: 5,
                    color: "rgb(59 130 246)",
                  }
                : {}
            }
            className={
              "mt-2 flex items-center gap-x-2 ml-2 pl-3 px-2 py-3 rounded-md text-gray-500 " +
              styles.box
            }
          >
            <Building size={17} className={"text-inherit " + styles.inicon} />
            <h1 className={"text-sm text-inherit " + styles.intext}>Company</h1>
          </NavLink>

          <NavLink
            to="pendingcompany"
            style={({ isActive }) =>
              isActive
                ? {
                    background: "rgb(239 246 255)",
                    borderRadius: 5,
                    color: "rgb(59 130 246)",
                  }
                : {}
            }
            className={
              "mt-2 flex items-center gap-x-2 text-gray-500 ml-2 pl-3 px-2 py-3 rounded-md " +
              styles.box
            }
          >
            <ClipboardCheck
              size={17}
              className={"text-inherit " + styles.inicon}
            />
            <h1 className={"text-sm text-inherit " + styles.intext}>
              Pending List
            </h1>
          </NavLink>

          <h1 className="mt-3 ml-2 text-sm">Feedback</h1>

          <NavLink
            to="reviews"
            style={({ isActive }) =>
              isActive
                ? {
                    background: "rgb(239 246 255)",
                    borderRadius: 5,
                    color: "rgb(59 130 246)",
                  }
                : {}
            }
            className={
              "mt-3 flex items-center gap-x-2 text-gray-500 ml-2 pl-3 px-2 py-3 rounded-md " +
              styles.box
            }
          >
            <Star size={17} className={"text-inherit " + styles.inicon} />
            <h1 className={"text-sm text-inherit " + styles.intext}>Reviews</h1>
          </NavLink>

          <NavLink
            to="queries"
            style={({ isActive }) =>
              isActive
                ? {
                    background: "rgb(239 246 255)",
                    borderRadius: 5,
                    color: "rgb(59 130 246)",
                  }
                : {}
            }
            className={
              "mt-3 flex items-center gap-x-2 text-gray-500 ml-2 pl-3 px-2 py-3 rounded-md " +
              styles.box
            }
          >
            <RiQuestionnaireLine
              size={17}
              className={"text-inherit " + styles.inicon}
            />
            <h1 className={"text-sm text-inherit " + styles.intext}>Queries</h1>
          </NavLink>
        </>
        <div className="mt-24">
          <NavLink
            to="team"
            style={({ isActive }) =>
              isActive
                ? {
                    background: "rgb(239 246 255)",
                    borderRadius: 5,
                    color: "rgb(59 130 246)",
                  }
                : {}
            }
            className={
              "mt-2 flex items-center gap-x-2 text-gray-500 hover:text-amber-500 hover:bg-amber-100 ml-2 pl-3 px-2 py-3 rounded-md transition ease-in-out duration-300"
            }
          >
            <IoIosPeople
              size={22}
              className={"text-inherit"}
            />
            <h1 className={"text-sm text-inherit"}>Team</h1>
          </NavLink>

          <button
            className={
              "mt-3 flex items-center gap-x-2 text-gray-500 w-full ml-2 pl-3 mr-3 px-2 py-3 rounded-md hover:bg-rose-100 hover:text-rose-500 transition ease-in-out duration-300"
            }
          >
            <VscSignOut size={20} className={"text-inherit"} />
            <h1 className={"text-sm text-inherit"}>LogOut</h1>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar_Admin;
