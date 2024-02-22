import NavCardProfile from "./NavCardProfile";
import { ShoppingBag, Bookmark } from "lucide-react";
import { IoMdPerson } from "react-icons/io";
import { IoExitOutline } from "react-icons/io5";
import { GiSkills } from "react-icons/gi";

const data = [
  { icon: ShoppingBag, text: "My Job Feed", link: "#jobFeed" },
  { icon: Bookmark, text: "Saved Jobs", link: "#saved" },
  { icon: IoMdPerson, text: "Profile", link: "#update" },
  { icon: GiSkills, text: "Resume", link: "/resume" },
  { icon: IoExitOutline, text: "Back to Home", link: "/jobseeker" },
];

const Sidebar = () => {
  return (
    <div className="flex-[1] max-h-full bg-blue-500">
      <h1 className="mt-4 text-[2rem] text-center font-[600] text-white tracking-wider">
        Inspiring Go
      </h1>
      <div className="mt-8 flex flex-col">
        {data.map((item, index) => (
          <NavCardProfile key={index} Icons={item.icon} text={item.text} link={item.link} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
