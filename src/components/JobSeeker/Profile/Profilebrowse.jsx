/* eslint-disable react/prop-types */
import UpdateInfoProfile_Job from "./UpdateInfoProfile_Job";
import JobFeed from "./JobFeed";
import SavedJobs from "./SavedJobs";

const Profilebrowse = () => {
  
  return (
    <div
     className="flex-[4] max-h-screen overflow-y-auto scrollbar-none">
      <JobFeed />
      <SavedJobs />
      <UpdateInfoProfile_Job />
    </div>
  );
};

export default Profilebrowse;
