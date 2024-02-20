/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import classes from "./Reg_Form.module.css";

const NextPrevButton = ({
  len,
  count,
  handleNext,
  handlePrev,
  isLast,
  handleSubmit,
}) => {
  return (
    <div className={classes.formFooter + " flex gap-3"}>
      <button
        type="button"
        id="prevBtn"
        className="flex-1 focus:outline-none border border-gray-300 py-2 px-5 rounded-lg shadow-sm text-center text-gray-700 bg-white hover:bg-gray-100 text-lg"
        onClick={handlePrev}
        disabled={count == 0}
      >
        Previous
      </button>

      <button
        type={"button"}
        id="nextBtn"
        className="flex-1 border border-transparent focus:outline-none p-3 rounded-md text-center text-white bg-indigo-600 hover:bg-indigo-700 text-lg"
        onClick={count === len - 1 ? handleSubmit : handleNext}
      >
        {count === len - 1 ? "Submit" : "Next"}
      </button>
    </div>
  );
};

export default NextPrevButton;
