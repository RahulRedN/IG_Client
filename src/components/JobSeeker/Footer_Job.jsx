import { Facebook, Instagram, Github, Twitter } from "lucide-react";
import styles from "./Footer_Job.module.css";
import { NavLink, useLocation } from "react-router-dom";

const Footer_Job = () => {
  const { pathname } = useLocation();
  
  const isLink = (path) => {
    return path === pathname;
  }

  return (
    <div className={`${isLink("/jobseeker/findjobs") ?"bg-white": "bg-gray-100"} w-full`}>
      <div className="flex w-[80vw] mx-auto flex-wrap p-5">

        <div className="flex-[4] flex flex-col w-fit justify-between">
          <div className="flex flex-col gap-6">
            <h1 className="text-3xl text-gray-900 font-[600]">Inspiring Go</h1>
            <p className="max-w-[25vw] leading-8 text-gray-500">
              In a world of change, our consultancy brings stability and success
              to your doorstep.Transform challenges into opportunities with our
              expert consultancy.
            </p>
          </div>
          <div className="flex gap-3">
            <div
              className={
                "bg-gray-200 p-2 rounded-[50%] hover:bg-blue-500 " +
                styles.icondivf
              }
            >
              <Facebook
                strokeWidth={0.2}
                size={25}
                className={"fill-blue-500 text-blue-500 " + styles.iconf}
              />
            </div>
            <div
              className={
                "bg-gray-200 p-2 rounded-[50%] hover:bg-pink-500 " +
                styles.icondivi
              }
            >
              <Instagram
                strokeWidth={2}
                size={25}
                className={"text-pink-500 " + styles.iconi}
              />
            </div>
            <div
              className={
                "bg-gray-200 p-2 rounded-[50%] hover:bg-gray-800 " +
                styles.icondivg
              }
            >
              <Github
                strokeWidth={0.2}
                size={25}
                className={"fill-gray-800 text-gray-800 " + styles.icong}
              />
            </div>
            <div
              className={
                "bg-gray-200 p-2 rounded-[50%] hover:bg-blue-700 " +
                styles.icondivf
              }
            >
              <Twitter
                strokeWidth={0.2}
                size={25}
                className={"fill-blue-700 text-blue-700 " + styles.iconf}
              />
            </div>
          </div>
        </div>

        <div className="flex-[3] flex flex-col gap-6">
          <h1 className="text-xl text-gray-800 font-[600]">Useful Links</h1>
          <div className={"flex flex-col gap-4 " + styles.link}>
            <NavLink to="findjobs">Find Jobs</NavLink>
            <NavLink to="contactus">Contact us</NavLink>
            <NavLink to="profile">Profile</NavLink>
            <NavLink to="/faqs">FAQ s</NavLink>
            <NavLink to="/aboutus">About Us</NavLink> 
            
          
          </div>
        </div>

        <div className="flex-[2] flex flex-col gap-6 h-full">
          <h1 className="text-xl text-gray-900 font-[600]">Subscribe</h1>
          <div className="flex flex-col">
            <p className="text-gray-700">
              Subscribe Inspiring Go to get updates about new jobs.
            </p>
            <div className="flex flex-col justify-between h-full gap-3">
              <input
                type="text"
                placeholder="Enter your Email"
                className="mt-2 p-2 outline-none focus:border-gray-600 border placeholder:text-gray-700 border-gray-400 rounded-md"
              />
              <button className="mt-3 p-3 w-full bg-blue-500 text-white rounded hover:bg-blue-600">Subscribe</button>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center text-gray-800 font-[600]">© 2023 Inspiring Go</div>
    </div>
  );
};

export default Footer_Job;
