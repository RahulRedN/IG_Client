import classes from "../FeedBack/css/FeedbackForm.module.css";
import { useState } from "react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import Radios from "./radios";

import StarRating from "./StarRating/StarRating";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { setReview } from "../../../redux/jobseekerReducer";

const FeedbackForm = ({ closeModal, appId }) => {
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.jobseeker.data.uid);
  const [userFeedback, setUserFeedback] = useState("");
  const [rating, setRating] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleFeedbackChange = (event) => {
    const inputText = event.target.value;
    const words = inputText.split(/\s+/);
    const limitedWords = words.slice(0, 10);
    const limitedText = limitedWords.join(" ");
    setUserFeedback(limitedText);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const backArrow = () => {
    closeModal();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        import.meta.env.VITE_SERVER + "/api/jobseeker/postReview",
        {
          uid,
          aid: appId,
          rating,
          type: selectedCategory,
          feedback: userFeedback,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.status == 200) {
        dispatch(
          setReview({
            appId,
            rating,
            type: selectedCategory,
            feedback: userFeedback,
            reviewed: true,
          })
        );
        toast.success("Feedback Submited");
        closeModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <ArrowBackIcon
        onClick={backArrow}
        boxSize={8}
        _hover={{ cursor: "pointer", color: "#2b71e8" }}
      />

      <div className={classes.feedback_heading}>
        <h1 className={classes.feedback_name}> Your Feedback </h1>
      </div>

      <hr className={classes.hr_feed} />

      <form onSubmit={handleSubmit} action="" className={classes.feedback_form}>
        <h1>What is your opinion of this page ?</h1>
        <div className={classes.rating}>
          <StarRating onRate={handleRatingChange} />
        </div>
        <br /> <br /> <br />
        <div>
          <h1>Please select your feedback category below</h1>

          <div className={classes.category}>
            <Radios onSelectCategory={handleCategoryChange} />
          </div>
        </div>
        <div>
          <h1>Please leave your feedback below</h1>
          <textarea
            className={classes.textarea_feedback}
            value={userFeedback}
            onChange={handleFeedbackChange}
            placeholder="Write your feedback here"
            rows={4}
            cols={50}
          />
        </div>
        <button className={classes.submit_btn}>Submit Feedback</button>
      </form>
    </div>
  );
};

export default FeedbackForm;
