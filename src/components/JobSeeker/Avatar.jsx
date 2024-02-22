import { BsFillPersonFill } from "react-icons/bs";
import { IoMdExit } from "react-icons/io";
import { NavLink } from "react-router-dom";

import styles from "./Avatar.module.css";
import toast from "react-hot-toast";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const Dropdown = () => {
  const nav = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/auth/logout");
      if (res.status == 200) {
        toast.success("Logged out successfully!");
        localStorage.removeItem("token");
        nav("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={styles.container}>
      <div
        className={
          "cursor-pointer border-[4px] border-[#25cc8b] rounded-[50%] p-1"
        }
      >
        <BsFillPersonFill
          strokeWidth={0.5}
          className=" text-[#25cc8b]"
          size={40}
        />
      </div>

      <div className={styles.content}>
        <div className="pt-2 px-2 flex-[1] flex items-center text-xl tracking-wider text-gray-800">
          <NavLink
            to="profile"
            className="hover:bg-gray-300 p-1 w-full transition ease-in-out duration-300"
          >
            Profile
          </NavLink>
        </div>
        <div className="flex-[1] py-1 px-2 text-xl rounded-b-lg  text-red-500">
          <button
            className="flex items-center gap-1 p-1 hover:bg-red-100 w-full transition ease-in duration-100"
            onClick={logoutHandler}
          >
            <IoMdExit strokeWidth={10} size={23} />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
