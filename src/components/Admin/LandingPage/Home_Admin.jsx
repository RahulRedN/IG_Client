import { useEffect, useState } from "react";
import DataBoxes from "./DataBoxes";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import Table_RecentUsers from "./Table_RecentUsers";
import TodoList from "./Todo_List/TodoList";
import axios from "axios";

const Home_Admin = () => {
  const [datastats, setDatastats] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          import.meta.env.VITE_SERVER + "/api/admin/homestats"
        );
        console.log(res.data);
        setDatastats(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-[#f5f5f5] p-3">
      <DataBoxes
        CCR={datastats?.CCR}
        ICR={datastats?.ICR}
        USR={datastats?.USR}
        RCR={datastats?.RCR}
      />
      <div className="mt-4 flex gap-x-8 h-[28rem] w-full">
        <div className="mt-4 flex-[5] bg-white py-5">
          <h1 className="text-center pt-3 text-lg font-bold">
            Current State of Monthly Users
          </h1>
          <LineChart />
        </div>
        <div className="mt-4 flex-[2] bg-white">
          <h1 className="pt-6 text-center text-lg font-bold">
            Accepted/Rejected Requests (Company s)
          </h1>
          <PieChart />
        </div>
      </div>
      <div className="mt-8 flex gap-x-8">
        <div className="flex-[3] bg-white h-[21rem] overflow-y-scroll scrollbar-none px-2">
          <h1 className="pl-3 py-3 font-extrabold">Recent Users</h1>
          <Table_RecentUsers
            TableDataJob={datastats?.recentusers}
            TableDataCom={datastats?.recentcompanies}
          />
        </div>
        <div className="flex-[2] bg-white overflow-y-scroll scrollbar-none px-2">
          <TodoList />
        </div>
      </div>
      <br></br>
      <hr className="bg-black" />
      <div className="mt-8 flex justify-between">
        <p>
          Copyright <span className="text-lg text-black">©</span> InspiringGo
          2023
        </p>
      </div>
    </div>
  );
};

export default Home_Admin;
