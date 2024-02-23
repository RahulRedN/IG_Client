import DataBox from "./DataBox";

const DataBoxes = ({ CCR, ICR, USR, RCR }) => {
  return (
    <div className="flex gap-x-5">
      <DataBox title={"JobSeekers"} No={USR} UpDown={"Increased"} num={10} />
      <DataBox
        title={"Incoming Requests"}
        No={ICR}
        UpDown={"Increased"}
        num={20}
      />
      <DataBox title={"Companies"} No={CCR} UpDown={"Decreased"} num={5} />
      <DataBox title={"Reviews"} No={RCR} UpDown={"Increased"} num={10} />
    </div>
  );
};

export default DataBoxes;
