import classes from "./ProfileNavbar.module.css";

import { FaBell, FaSearch } from "react-icons/fa";
import { IoMail, IoPerson } from "react-icons/io5";
import { useAuth } from "../../../Firebase/AuthContexts";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProfileNavbar = ({ notification, mail, searchHandler }) => {
  const user = useSelector((state) => state.jobseeker.data);
  return (
    <nav className={classes.container}>
      <div className={classes.search}>
        <input
          type="text"
          placeholder="Search anything.."
          onChange={(e) => {
            searchHandler(e.target.value);
          }}
        />
        <FaSearch />
      </div>
      <div className={classes.content}>
        <span>
          <FaBell size={20} />
          {notification && <p>{notification}</p>}
        </span>
        <span>
          <IoMail size={20} />
          {mail && <p>{mail}</p>}
        </span>
        <div className={classes.userInfo}>
          <span>
            <IoPerson size={20} />
          </span>
          <h5>{user.fname}</h5>
        
        </div>
      </div>
    </nav>
  );
};

export default ProfileNavbar;
