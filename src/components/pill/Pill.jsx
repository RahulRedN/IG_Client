/* eslint-disable react/prop-types */
import classes from '../../MultiSelect/MultiSelect.module.css'

const Pill = ({ text, onClick}) => {
    return (
      <span className={classes.user_pill} onClick={onClick}>
        {/* <img src={image} alt={text} /> */}
        <span>{text} &times;</span>
      </span>
    );
  };
  
  export default Pill;