/* eslint-disable no-unused-vars */

import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { mockDataContacts } from "../Data/mockData";
import Header from "../Dashboard/Header";
import { useTheme } from "@mui/material";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const jobs = useSelector((state) => state.company.jobs);
  const applications = useSelector((state) => state.company.applications);
  const users = useSelector((state) => state.company.users);
  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    const accepted = applications
      ?.filter((app) => app.status === "accepted")
      .map((app) => {
        const jobDetails = jobs.find((job) => job._id === app.jobId);
        const userDetails = users.find((user) => user._id === app.userId);

        return {
          ...app,
          jobDetails: jobDetails || null,
          userDetails: userDetails || null,
        };
      });

    setEmployee(accepted);
  }, [applications]);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
      fontSize: "20px  ",
    },
    {
      field: "position",
      headerName: "Position",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "joindate",
      headerName: "Joined On",
      flex: 1,
    },
  ];

  const mockData = employee?.map((emp, idx) => {
    const currDate = new Date();
    const dob = new Date(emp.userDetails.dob);
    const date = new Date(emp.createdAt);
    return {
      id: idx + 1,
      name: emp.userDetails.fname,
      email: emp.userDetails.email,
      age: Math.floor(currDate.getFullYear() - dob.getFullYear()),
      phone: emp.userDetails.mobile,
      position: emp.jobDetails.position,
      joindate: date.toDateString("en-IN"),
    };
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [sortByJoinedDate, setSortByJoinedDate] = useState("descending");

  // Handle changes in the search query input field
  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle changes in the sort option select box
  const handleSortByJoinedDateChange = (e) => {
    setSortByJoinedDate(e.target.value);
  };

  // Filter and sort the data based on search and sort criteria
  const filteredData = mockData
    ?.filter((item) => {
      return (
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.phone.includes(searchQuery)
      );
    })
    .sort((a, b) => {
      const dateA = new Date(a.joindate);
      const dateB = new Date(b.joindate);

      if (sortByJoinedDate === "descending") {
        return dateB - dateA;
      } else {
        return dateA - dateB;
      }
    });

  return (
    <Box m="20px" className="">
      <div className="flex justify-between items-center">
        <Header
          title="Employees"
          subtitle="List of Employees who got selected"
        />
        <div className="flex">
          <div>
            <label className="mr-2 text-black text-base">Filter By</label>
            <input
              type="text"
              placeholder="Search by Name, Mobile, or Email"
              value={searchQuery}
              className="border-2 border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500 h-10 w-[18rem] mr-2"
              onChange={handleSearchQueryChange}
            />
          </div>

          {/* Select Box for Sorting */}
          <div>
            <label className="mr-2 text-black text-base">
              Sort by Joining Date
            </label>
            <select
              value={sortByJoinedDate}
              onChange={handleSortByJoinedDateChange}
              className="border-2 border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500 h-10 w-30 mr-2"
            >
              <option value="ascending" className="text-base">
                Ascending
              </option>
              <option value="descending" className="text-base">
                Descending
              </option>
            </select>
          </div>
        </div>
      </div>
      <Box
        m="0 0 0 0"
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
            fontSize: "0.89rem", //font sz for entire table
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[200],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[900],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={filteredData}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10, page: 0 },
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Contacts;
