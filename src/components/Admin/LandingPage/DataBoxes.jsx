import DataBox from './DataBox'

const DataBoxes = () => {
  return (
    <div className="flex gap-x-5">
        <DataBox title={"JobSeekers"} No={4003} UpDown={"Increased"} num={10}/>
        <DataBox title={"Incoming Requests"}  No={500} UpDown={"Increased"} num={20}/>
        <DataBox title={"Companies"}  No={2003} UpDown={"Decreased"} num={5}/>
        <DataBox title={"It's Ok"}  No={4003} UpDown={"Increased"} num={10}/>
    </div>
  )
}

export default DataBoxes
