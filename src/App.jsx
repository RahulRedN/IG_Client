import { ChakraProvider } from "@chakra-ui/react";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
  RouterProvider,
} from "react-router-dom";

import { Toaster } from "react-hot-toast";

import { AuthContexts } from "./Firebase/AuthContexts";

import Home from "./pages/Home";
import HomePage from "./components/homepage_compos/HomePage";
import ContactUs_Home from "./components/homepage_compos/ContactUs_Home/ContactUs_Home";
import AboutUs from "./components/homepage_compos/Aboutus";
import Faqs from "./components/homepage_compos/Faqs";

import JobSeeker from "./pages/JobSeeker";
import ContactUs from "./components/JobSeeker/ContactUs/ContactUs_jobseeker";
import JLanding from "./components/JobSeeker/Home/JobLanding";

import Admin_Login from "./components/admin_login/Admin_Login";

import Company from "./pages/Company";
import Login_SignUp from "./pages/Login_SignUp";
import FindJobs from "./components/JobSeeker/FindJob/FindJobs";
import Profile_Job from "./components/JobSeeker/Profile/Profile_Job";
import Dashboard from "./components/Company/Dashboard/Dashboard";

import Employees from "./components/Company/Employees/Employees";
import PendingList from "./components/Company/PendingList/PendingList";
import PostJob from "./components/Company/PostJob/PostJob";
import LoginCompany from "./components/Login/LoginCompany/LoginCompany";

import PostedJobs from "./components/Company/PostedJobs/PostedJobs";
import QuesCards from "./components/homepage_compos/News/QuesCards";

import PrivateRoute from "./PrivateRoute/PrivateRoute";
import ReviewPage from "./components/Company/ReviewPage/ReviewPage";
import TestimonialForm from "./components/JobSeeker/TestimonialForm/TestimonialForm";
import MultiSelect from "./components/JobSeeker/Profile/MultiSelect/MultiSelect";

import Admin from "./pages/Admin";
import Home_Admin from "./components/Admin/LandingPage/Home_Admin";
import JobSeeker_User from "./components/Admin/JobSeeker_User/JobSeeker_User";
import Company_User from "./components/Admin/Company_User/Company_User";
import Pending_Company from "./components/Admin/Pending_Company/Pending_Company";
import Queries from "./components/Admin/Queries/Queries";
import Reviews from "./components/Admin/Reviews/Reviews";

const Root = () => {
  return <Outlet />;
};

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="/" element={<Home />}>
        <Route index element={<HomePage />} />
        <Route path="faqs" element={<Faqs />} />
        <Route path="aboutus" element={<AboutUs />} />
        <Route path="contactus" element={<ContactUs_Home />} />

        <Route path="multiselect" element={<MultiSelect />} />

        <Route path="news" element={<QuesCards />} />
      </Route>

      <Route path="/login" element={<Login_SignUp />} />
      <Route path="/logincompany" element={<LoginCompany />} />

      <Route
        path="/jobseeker"
        element={
          <PrivateRoute role="jobseeker">
            <JobSeeker />
          </PrivateRoute>
        }
      >
        <Route index element={<JLanding />} />
        <Route path="findjobs" element={<FindJobs />} />

        <Route path="profile" element={<Profile_Job />} />

        <Route path="testimonialform" element={<TestimonialForm />} />
        <Route path="contactus" element={<ContactUs />} />
      </Route>
      {/* 
      <Route path="/company" element={<Sidebar />} />
        <Route path="navbar" element={<Navbar />} /> */}
      <Route
        path="/company"
        element={
          // <PrivateRoute role="company">
            <Company />
          // </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="employeelist" element={<Employees />} />
        <Route path="pendinglist" element={<PendingList />} />
        <Route path="postjob" element={<PostJob />} />
        <Route path="postedjobs" element={<PostedJobs />} />
        <Route path="reviews" element={<ReviewPage />} />
      </Route>

      <Route path="/admin" element={<Admin />}>
        <Route path="home" element={<Home_Admin />} />
        <Route path="jobseekers" element={<JobSeeker_User />} />
        <Route path="companys" element={<Company_User />} />
        <Route path="pendingcompany" element={<Pending_Company />} />
        <Route path="queries" element={<Queries />} />
        <Route path="reviews" element={<Reviews />} />
      </Route>
      <Route path="/test" element={<Admin_Login />} />
    </Route>
  )
);

function App() {
  return (
    <AuthContexts>
      <ChakraProvider>
        <Toaster />
        <RouterProvider router={Router} />
      </ChakraProvider>
    </AuthContexts>
  );
}

export default App;
