import { CgSearch } from "react-icons/cg";

const NoJob = () => {
  return (
    <div className="pr-24 gap-8 h-fit rounded w-full">
      <div className="w-[90%] flex flex-col gap-5 mx-auto shadow-lg p-8">
        <div className="flex items-center gap-2">
          <CgSearch className="text-6xl text-center" />
          <span className="text-4xl">.....</span>
        </div>
        <p className="text-xl ml-4">No Jobs found for the specific filter</p>
      </div>
    </div>
  );
};

export default NoJob;
