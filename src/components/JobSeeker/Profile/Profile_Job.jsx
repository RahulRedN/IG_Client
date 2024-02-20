import { useEffect, useRef, useState } from "react";
import Profilebrowse from "./Profilebrowse";
import Sidebar from "./Sidebar";

const Profile_Job = () => {

  return (
    <div className="flex">
      <Sidebar />
      <Profilebrowse/>
    </div>
  );
};

export default Profile_Job;
