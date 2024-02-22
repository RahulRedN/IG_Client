/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

export const companyReducer = createSlice({
  name: "company",
  initialState: {
    data: {},
    jobs: [],
    applications: [],
    users: [],
  },
  reducers: {
    setCompanyData: (state, action) => {
      return { ...state, ...action.payload };
    },
    removeJob: (state, action) => {
      const newJobs = state.jobs.filter((job) => job._id != action.payload);
      return { ...state, jobs: newJobs };
    },
    addJob: (state, action) => {
      return { ...state, jobs: [...state.jobs, action.payload] };
    },
    setStatus: (state, action) => {
      console.log(action.payload);
      const newJobs = state.jobs.map((job) => {
        if (job._id == action.payload.jobId) {
          return {
            ...job,
            vacancies: job.vacancies - 1,
          };
        } else {
          return job;
        }
      });

      const newApplications = state.applications.map((app) => {
        if (app._id == action.payload.appId) {
          console.log(app);
          return {
            ...app,
            status: action.payload.action,
            createdAt: new Date(),
          };
        } else {
          return app;
        }
      });

      return { ...state, jobs: newJobs, applications: newApplications };
    },
    resetCompany: (state, action) => {
      return { data: {}, jobs: [] };
    },
  },
});

export const { setCompanyData, addJob, removeJob, setStatus, resetCompany } =
  companyReducer.actions;

export default companyReducer.reducer;
