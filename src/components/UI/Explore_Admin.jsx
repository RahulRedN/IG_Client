import { FolderInput } from "lucide-react";

const Explore_Admin = ({ text }) => {
  return (
    <div className="mt-3 flex items-center gap-x-3">
      <FolderInput size={17} />
      <p className="text-base">/</p>
      <p className="text-base text-zinc-900">Admin</p>
      <span className="text-base">/</span>
      <p className="text-base underline">{text}</p>
    </div>
  );
};

export default Explore_Admin;