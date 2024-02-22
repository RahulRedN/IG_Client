/* eslint-disable no-unused-vars */

import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { mockDataContacts } from "../Data/mockData";
import Header from "../Dashboard/Header";
import { useTheme } from "@mui/material";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { db } from "../../../Firebase/config";
import {doc, collection, getDoc} from "firebase/firestore"

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const jobs = useSelector((state) => state.company.jobs);
  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    const fetch = () => {
      setEmployee([]);
      try {
        jobs.forEach((job) => {
          Object.keys(job.status).forEach(async (user) => {
            if (job.status[user].applied) {
              const docRef = doc(collection(db, "users"), user);
              const res = await getDoc(docRef);

              if (res) {
                setEmployee((state) => [
                  ...state,
                  {
                    ...res.data(),
                    id: res.id,
                    position: job.position,
                    status: { ...job.status[user] },
                    jobId: job.id,
                  },
                ]);
              }
            }
          });
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, [jobs]);

  const mockData = employee.map((emp, idx) => {
    const currDate = new Date();
    const dob = new Date(emp.dob);
    const date = new Date(emp.status.date);
    return {
      id: idx + 1,
      name: emp.fname,
      email: emp.email,
      age: Math.floor(currDate.getFullYear() - dob.getFullYear()),
      phone: emp.mobile,
      position: emp.position,
      joindate: date.toDateString("en-IN"),
    };
  });

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

  return (
    <Box m="20px" className="">
      <Header title="Employees" subtitle="List of Employees who got selected" />
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
            padding : "1rem",
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
          rows={mockData}
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
