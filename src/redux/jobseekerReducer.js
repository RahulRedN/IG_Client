/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

export const jobseekerReducer = createSlice({
  name: "jobseeker",
  initialState: {
    data: {},
    jobs: [],
  },
  reducers: {
    setData: (state, action) => {
      return { ...state, ...action.payload };
    },
    setFav: (state, action) => {
      return { ...state, data: { ...state.data, fav: action.payload } };
    },
    setSkills: (state, action) => {
      return { ...state, data: { ...state.data, skills: action.payload } };
    },
    setApplied: (state, action) => {
      const newApplication = [...state.data.applications, action.payload];
      return {
        ...state,
        data: { ...state.data, applications: newApplication },
      };
    },
    setReview: (state, action) => {
      const newApplication = state.data.applications.map((app) => {
        if (app._id == action.payload.appId) {
          return { ...app, review: { ...action.payload.review } };
        } else {
          return app;
        }
      });
      return {
        ...state,
        data: { ...state.data, applications: newApplication  },
      };
    },
    reset: (state, action) => {
      return { data: {}, jobs: [] };
    },
  },
});

export const { setData, setFav, setSkills, setApplied, reset, setReview } =
  jobseekerReducer.actions;

export default jobseekerReducer.reducer;
