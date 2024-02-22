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
      const newJobs = state.jobs.filter((job) => job.id != action.payload);
      return { ...state, jobs: newJobs };
    },
    addJob: (state, action) => {
      return { ...state, jobs: [...state.jobs, action.payload] };
    },
    setStatus: (state, action) => {
      const newJobs = state.jobs.map((job) => {
        if (job.id == action.payload.jobId) {
          console.log(action.payload.status);
          return {
            ...job,
            status: action.payload.status,
            vacancies: action.payload.vacancies,
          };
        } else {
          return job;
        }
      });

      return { ...state, jobs: newJobs };
    },
    resetCompany: (state, action) => {
      return { data: {}, jobs: [] };
    },
  },
});

export const { setCompanyData, addJob, removeJob, setStatus, resetCompany } =
  companyReducer.actions;

export default companyReducer.reducer;
