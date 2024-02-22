/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

export const jobseekerReducer = createSlice({
  name: "jobseeker",
  initialState: {
    data: {},
    jobs: [],
    applied: []
  },
  reducers: {
    setData: (state, action) => {
      return { ...state, ...action.payload };
    },
    setFav: (state, action) => {
      return { ...state, data: { ...state.data, fav: action.payload } };
    },
    setApplied: (state, action) => {
      const newStatus = { ...action.payload.data };
      const newJobs = state.jobs.map((job) => {
        if (action.payload.id == job.id) {
          return { ...job, status: newStatus };
        } else {
          return job;
        }
      });
      return { ...state, jobs: newJobs };
    },
    reset: (state, action) => {
      return { data: {}, jobs: [] };
    },
  },
});

export const { setData, setFav, setApplied, reset } = jobseekerReducer.actions;

export default jobseekerReducer.reducer;
