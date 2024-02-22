  import { useState } from "react";
  import { StarRatingDiv, Star } from "./StarRatingStyles"; 

  export default function StarRating({ onRate }) {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    const handleRatingClick = (ratingValue) => {
      setRating(ratingValue);
      onRate(ratingValue);
    };

    return (
      <div style={{ marginLeft: '100px' }}>
        <StarRatingDiv>
          {[...Array(5)].map((_, i) => {
            const ratingValue = i + 1;
            return (
              <label key={i}>
                <input
                  type="radio"
                  name="rating"
                  value={ratingValue}
                  onClick={() => handleRatingClick(ratingValue)}
                />
                <Star
                  size={50}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(null)}
                  className={
                    ratingValue <= (hover || rating) ? "activeStar" : "star"
                  }
                />
              </label>
            );
          })}
        </StarRatingDiv>
        <br /> 
      </div>
    );
  }