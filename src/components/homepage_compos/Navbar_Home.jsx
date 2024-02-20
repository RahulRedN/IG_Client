/* eslint-disable react/prop-types */
import { Link, NavLink } from "react-router-dom";
import classes from "./css/Navbar_Home_Styles.module.css";

const Navbar = ({ navClass }) => {
  return (
    <nav className={navClass}>
      <div className={classes.left}>
        <div className="flex flex-row items-center">
          <img
            className={classes.logo}
            src="/images/IG_logo_Dark.png"
            alt="Logo"
          />
          <NavLink to="/" className={"text-3xl"}>
            {" "}
            Inspiring Go
          </NavLink>
        </div>
        <ul className={classes.items}>
          <li>
            <NavLink to="aboutus">ABOUT US</NavLink>
          </li>
          <li>
            <NavLink to="contactus">CONTACT</NavLink>
          </li>
          <li>
            <NavLink to="faqs">FAQS</NavLink>
          </li>
          <li>
            <NavLink to="news">NEWS</NavLink>
          </li>
        </ul>
        <Link
          to="login"
          className="hover:text-[#000dff] rounded text-lg transition ease-in-out duration-150"
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
