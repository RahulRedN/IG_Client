import Explore_Admin from "../../UI/Explore_Admin";
import RowUser from "./RowUser";
import { RiGraduationCapFill } from "react-icons/ri";

const JobSeeker_User = () => {
  return (
    <div className="p-3 h-full">
      <div className="flex gap-x-3">
        <h1 className="pb-3 font-[500] text-lg">Jobseeker users</h1>
        <RiGraduationCapFill size={25} />
      </div>
      <Explore_Admin text={"Jobseekers"} />

      <table className="w-[99%] mt-4 bg-white">
        <thead className="bg-zinc-100 h-12">
          <tr>
            <th className="text-left font-light text-base py-3 px-2 w-[6%]">
              #
            </th>
            <th className="text-left font-light text-sm py-3 px-2 w-[18%]">
              Name
            </th>
            <th className="text-left font-thin text-sm py-3 px-2 w-[10%]">
              Gender
            </th>
            <th className="text-left font-thin text-sm py-3 px-2 w-[6%]">
              Age
            </th>
            <th className="text-left font-thin text-sm py-3 px-2 w-[15%]">
              Phone Number
            </th>
            <th className="text-left font-thin text-sm py-3 px-2 w-[23%]">
              Email
            </th>
            <th className="text-left font-thin text-sm py-3 px-2">
              Joined Date
            </th>
            <th className="text-left font-thin text-sm py-3 pr-4">Action</th>
          </tr>
        </thead>
        <tbody>
          <RowUser />
          <RowUser />
          <RowUser />
        </tbody>
      </table>
    </div>
  );
};

export default JobSeeker_User;
