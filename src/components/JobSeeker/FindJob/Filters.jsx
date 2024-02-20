/* eslint-disable react/prop-types */
import { Filter, SearchCode, Navigation, ArrowDown10 } from "lucide-react";
import { useState } from "react";
import { FaHouse } from "react-icons/fa6";
import {
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Tooltip,
} from "@chakra-ui/react";

const Filters = ({ jobs, setState }) => {
  const [data, setData] = useState({ position: "", location: "" });
  const [isClicked, setIsClicked] = useState(false);
  const [isClickedLoc, setIsClickedLoc] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleFliter = (
    position,
    salary,
    location,
    workFromHome,
    slideValue
  ) => {
    let newState = [...jobs];

    if (position.trim() != "") {
      newState = jobs.filter((job) =>
        job.position.toLowerCase().includes(position.trim().toLowerCase())
      );
    }

    if (workFromHome) {
      newState = newState?.filter((job) => !job.location);
    } else if (location.trim() != "") {
      newState = newState?.filter(
        (job) =>
          job.location &&
          job.location.toLowerCase().includes(location.trim().toLowerCase())
      );
    }

    if (salary && jobs.length > 1) {
      newState = newState?.sort((a, b) => a.salary - b.salary);
    }

    newState = newState?.filter((job) => job.salary >= slideValue * 100000);

    setState((state) => ({ ...state, jobs: newState }));
  };

  return (
    <div className="w-[20vw] h-[70vh] p-3 top-[15%] sticky flex-[3] shadow-xl border border-gray-100 bg-white">
      <div className="mt-5 flex justify-center items-center gap-1">
        <Filter size={25} color="#60a5fa" />
        <h1 className="text-zinc-800 font-[600] tracking-wider">Filters</h1>
      </div>

      <div className="mt-5">
        <label className="font-[600]">Search by Position</label>
        <div className="relative flex items-center">
          <SearchCode
            size={20}
            className="absolute left-2 text-gray-500 top-[0.95rem]"
          />
          <input
            type="text"
            placeholder="Search Job..."
            onChange={(e) => {
              setData((state) => {
                handleFliter(
                  e.target.value,
                  isClicked,
                  state.location,
                  isClickedLoc,
                  sliderValue
                );
                return { ...state, position: e.target.value };
              });
            }}
            className="mt-1 border border-zinc-400 p-2 pl-8 w-[95%] rounded-md hover:border-blue-500 focus:border-blue-500 outline-none placeholder:text-zinc-600"
          />
        </div>
      </div>

      <div className="mt-5">
        <label className="font-[600]">Search by Location</label>
        <div className="relative flex items-center">
          <Navigation
            size={20}
            className="absolute left-2 top-[0.95rem] text-gray-500"
          />
          <input
            type="text"
            onChange={(e) => {
              setData((state) => {
                handleFliter(
                  data.position,
                  isClicked,
                  e.target.value,
                  isClickedLoc,
                  sliderValue
                );
                return { ...state, location: e.target.value };
              });
            }}
            placeholder="Search Location..."
            className="mt-1 border border-zinc-400 p-2 pl-8 w-[95%] rounded-md hover:border-blue-500 focus:border-blue-500 outline-none placeholder:text-zinc-600"
          />
        </div>
      </div>

      <div
        onClick={() => {
          setIsClickedLoc((state) => {
            handleFliter(
              data.position,
              isClicked,
              data.location,
              !state,
              sliderValue
            );
            return !state;
          });
        }}
        className={`max-w-[12vw] mt-5 p-2 flex items-center border-2 font-[600] gap-2 cursor-pointer border-sky-500 rounded-md ${
          isClickedLoc ? "bg-sky-500 text-white" : "text-sky-500 bg-white"
        } transition-colors duration-500 ease-in-out`}
      >
        <FaHouse size={18} />
        <h1 className="font-[600]">Work from home</h1>
      </div>

      <div
        onClick={() => {
          setIsClicked((state) => {
            handleFliter(
              data.position,
              !state,
              data.location,
              isClickedLoc,
              sliderValue
            );
            return !state;
          });
        }}
        className={`mt-5 p-2 max-w-[12vw] flex items-center border-2 font-[600] cursor-pointer gap-2 border-green-500 rounded-md ${
          isClicked ? "bg-green-500 text-white" : "text-green-500 bg-white"
        } transition-colors duration-500 ease-in-out`}
      >
        <ArrowDown10 size={25} />
        <h1 className="font-[600] tracking-wide">Sort by salary</h1>
      </div>

      <div className="mt-5 w-full">
        <h1 className="font-[600]">Annual Salary(in lakhs)</h1>
        <div className="w-full p-2">
          <Slider
            id="slider"
            defaultValue={0}
            step={5}
            min={0}
            max={25}
            colorScheme="blue"
            onChange={(v) =>
              setSliderValue(() => {
                handleFliter(
                  data.position,
                  isClicked,
                  data.location,
                  isClickedLoc,
                  v
                );
                return v;
              })
            }
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            direction="rtl"
          >
            <br></br>
            <SliderMark value={0} mt="1" fontSize="sm">
              0
            </SliderMark>
            <SliderMark value={5} mt="1" ml="-1" fontSize="sm">
              5
            </SliderMark>
            <SliderMark value={10} mt="1" ml="-1" fontSize="sm">
              10
            </SliderMark>
            <SliderMark value={15} mt="1" ml="-1" fontSize="sm">
              15
            </SliderMark>
            <SliderMark value={20} mt="1" ml="-1" fontSize="sm">
              20
            </SliderMark>
            <SliderMark value={25} mt="1" ml="-1" fontSize="sm">
              25
            </SliderMark>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <Tooltip
              hasArrow
              bg="blue.500"
              color="white"
              placement="top"
              isOpen={showTooltip}
              label={`${sliderValue}`}
            >
              <SliderThumb />
            </Tooltip>
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Filters;
