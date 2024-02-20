import { combineReducers, configureStore } from "@reduxjs/toolkit";
import jobseekerReducer from "./jobseekerReducer";
import companyReducer from "./companyReducer";

const rootReducer = combineReducers({
  jobseeker: jobseekerReducer,
  company: companyReducer,
});

// Create Store
export default configureStore({ reducer: rootReducer });
