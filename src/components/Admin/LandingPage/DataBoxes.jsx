import DataBox from "./DataBox";

const DataBoxes = ({ CCR, ICR, USR, RCR }) => {
  return (
    <div className="flex gap-x-5">
      <DataBox
        title={"JobSeekers"}
        No={USR?.length > 0 && USR[0]}
        UpDown={USR?.length > 0 && USR[1] > 0 ? "Increased" : "Decreased"}
        num={USR?.length > 0 && USR[1]}
      />
      <DataBox
        title={"Incoming Requests"}
        No={ICR?.length > 0 && ICR[0]}
        UpDown={ICR?.length > 0 && ICR[1] > 0 ? "Increased" : "Decreased"}
        num={ICR?.length > 0 && ICR[1]}
      />
      <DataBox
        title={"Companies"}
        No={CCR?.length > 0 && CCR[0]}
        UpDown={CCR?.length > 0 && CCR[1] > 0 ? "Increased" : "Decreased"}
        num={CCR?.length > 0 && CCR[1]}
      />
      <DataBox
        title={"Reviews"}
        No={RCR?.length > 0 && RCR[0]}
        UpDown={RCR?.length > 0 && RCR[1] > 0 ? "Increased" : "Decreased"}
        num={RCR?.length > 0 && RCR[1]}
      />
    </div>
  );
};

export default DataBoxes;
