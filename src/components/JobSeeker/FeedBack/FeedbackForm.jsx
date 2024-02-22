import "../FeedBack/css/FeedbackForm.css";
import { useState } from "react";
import { ArrowBackIcon } from "@chakra-ui/icons";

import Radios from "./radios";
import StarRating from "./StarRating/StarRating";

const FeedbackForm = ({ closeModal }) => {
  const [userFeedback, setUserFeedback] = useState("");


  const handleFeedbackChange = (event) => {
    const inputText = event.target.value;
    const words = inputText.split(/\s+/);
    const limitedWords = words.slice(0, 10);
    
    const limitedText = limitedWords.join(' ');
    setUserFeedback(limitedText);
  
    setUserFeedback(event.target.value);
  };

  const backArrow = () => {
    closeModal();
  };

  const handlesubmit = (event) => {
    event.preventDefault();
    closeModal();
    alert("submitted");
  };

  return (
    <div>
      <ArrowBackIcon
        onClick={backArrow}
        boxSize={8}
        _hover={{ cursor: "pointer", color: "#2b71e8" }}
      />

      <div className="feedback-heading">
        {/* <h1 className="feedback-logo"> INSPIRINGO GO</h1> */}
        <h1 className="feedback-name"> Your Feedback </h1>
      </div>

      <hr className="hr-feed" />

      <form onSubmit={handlesubmit} action="" className="feedback-form">
        <h1>What is your opinion of this page ?</h1>
        <div className="rating">
          <StarRating />
        </div>
        <br /> <br /> <br />
        <div>
          <h1> Please select Your feedback category below </h1>

          <div className="category">
            <Radios />
          </div>
        </div>
        <div>
          <h1>Please leave your feedback below </h1>
          <textarea
            className="textarea-feedback"
            value={userFeedback}
            onChange={handleFeedbackChange}
            placeholder="Write your feedback here "
            rows={4}
            cols={50}
          />
        </div>
        <button className="submit-feed-btn">Submit Feedback</button>
      </form>
    </div>
  );
};

export default FeedbackForm;
