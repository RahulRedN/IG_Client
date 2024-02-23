import Explore_Admin from "../../UI/Explore_Admin";
import RowUser from "./RowUser";
import { RiGraduationCapFill } from "react-icons/ri";

import img from "../../../../public/images/mentors.jpg";
import { useEffect, useState } from "react";
import axios from "axios";

const JobSeeker_User = () => {
  // const JobSeekers = [

  //   {
  //     fname: "Pavan kumar",
  //     gender: "Male",
  //     joinedDate: "1920/10/19",
  //     age: "12",
  //     mobile: "+91 73373 26976",
  //     email: "jppavan2003@gmail.com",
  //     img: { img },
  //   },
  //   {
  //     fname: "Sonish",
  //     gender: "Male",
  //     joinedDate: "2005/09/08",
  //     age: "24",
  //     mobile: "+91 23974 23897",
  //     email: "sk@gmail.com",
  //     img: { img },
  //   },
  //   {
  //     fname: "Modi",
  //     gender: "Male",
  //     joinedDate: "1947/10/20",
  //     age: "69",
  //     mobile: "+91 30498 34890",
  //     email: "modiPM@gmail.com",
  //     img: { img },
  //   },
  //   {
  //     fname: "Modi",
  //     gender: "Male",
  //     joinedDate: "1947/10/20",
  //     age: "69",
  //     mobile: "+91 30498 34890",
  //     email: "modiPM@gmail.com",
  //     img: { img },
  //   },
  //   {
  //     fname: "Modi",
  //     gender: "Male",
  //     joinedDate: "1930/10/20",
  //     age: "69",
  //     mobile: "+91 30498 34890",
  //     email: "modiPM@gmail.com",
  //     img: { img },
  //   },
  //   {
  //     fname: "Modi",
  //     gender: "Male",
  //     joinedDate: "1947/10/20",
  //     age: "69",
  //     mobile: "+91 30498 34890",
  //     email: "modiPM@gmail.com",
  //     img: { img },
  //   },
  //   {
  //     fname: "Modi",
  //     gender: "Male",
  //     joinedDate: "1947/10/20",
  //     age: "69",
  //     mobile: "+91 30498 34890",
  //     email: "modiPM@gmail.com",
  //     img: { img },
  //   },
  // ];

  const [JobSeekers, setJobSeekers] = useState([]);

  useEffect(() => {
    const fetchJobSeekers = async () => {
      try {
        const res = await axios.get(
          import.meta.env.VITE_SERVER + "/api/admin/getalljobseekers"
        );

        console.log(res);

        if (Array.isArray(res.data)) {
          console.log(res.data);
          setJobSeekers(res.data);
        } else {
          console.error("Received data is not an array:", res.data);
        }
      } catch (error) {
        console.error("Error fetching job seekers:", error);
      }
    };

    fetchJobSeekers();
  }, []);

  console.log(JobSeekers);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortByJoinedDate, setSortByJoinedDate] = useState("descending");

  // Function to handle search query change
  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function to handle sorting option change
  const handleSortByJoinedDateChange = (e) => {
    setSortByJoinedDate(e.target.value);
  };

  // Filtered and sorted JobSeekers based on search and sort criteria
  const filteredSortedJobSeekers = JobSeekers.filter((jobseeker) => {
    return (
      jobseeker.fname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      jobseeker.mobile.includes(searchQuery) ||
      jobseeker.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }).sort((a, b) => {
    const joinedDateA = new Date(a.joinedDate);
    const joinedDateB = new Date(b.joinedDate);

    if (sortByJoinedDate === "ascending") {
      return joinedDateA - joinedDateB;
    } else {
      return joinedDateB - joinedDateA;
    }
  });

  return (
    <div className="p-3 h-full">
      <div className="flex gap-x-3">
        <h1 className="pb-3 font-[500] text-lg">Jobseeker users</h1>
        <RiGraduationCapFill size={25} />
      </div>
      <div className="flex items-center justify-between">
        <Explore_Admin text={"Jobseekers"} />
        <div className="flex">
          <div>
            <label className="mr-2 text-black text-base">Filter By</label>
            <input
              type="text"
              placeholder="Search by Name, Mobile, or Email"
              value={searchQuery}
              className="border-2 border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:border-blue-500 h-10 w-[18rem] mr-2"
              onChange={handleSearchQueryChange}
            />
          </div>

          {/* Select Box for Sorting */}
          <div>
            <label className="mr-2 text-black text-base">Joining Date</label>
            <select
              value={sortByJoinedDate}
              onChange={handleSortByJoinedDateChange}
              className="border-2 border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 h-10 w-30 mr-4"
            >
              <option value="ascending" className="text-lg h-10">
                Ascending
              </option>
              <option value="descending" className="text-base">
                Descending
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Search Input */}
      <table className="w-[99%] mt-8 bg-white">
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
            <th className="text-left font-thin text-sm py-3 px-2 w-[15%] ">
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
          {/* <RowUser />
          <RowUser />
          <RowUser /> */}
          {filteredSortedJobSeekers?.map((jobseeker, idx) => (
            <RowUser jobseeker={jobseeker} key={idx} idx={idx} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobSeeker_User;
