/* eslint-disable react/prop-types */
import classes from "./Reg_Form.module.css";
// import './Reg_Form.css'

const Form_Header = ({tab}) => {
  return (
    <div className={classes.container}>
      <div
        className={classes.form_header + " flex gap-3 mb-4 text-xs text-center"}
      >
        <span className={classes.stepIndicator + " flex-1 pb-8 relative " + (tab==0?classes.active:"") + (tab>0 ? classes.finish : " ")}>
          Contact Information
        </span>
        <span className={classes.stepIndicator + " flex-1 pb-8 relative " + (tab==1?classes.active:"") + (tab>1 ? classes.finish : " ")}>
          Personal Details
        </span>
        <span className={classes.stepIndicator + " flex-1 pb-8 relative " + (tab==2?classes.active:"") + (tab>2 ? classes.finish : " ")}>
          Background Information
        </span>
        <span className={classes.stepIndicator + " flex-1 pb-8 relative " + (tab==3?classes.active:"") + (tab>3 ? classes.finish : " ")}>
          Login Details
        </span>
      </div>
    </div>
    // <div className="text-blue-200"></div>
  );
};

export default Form_Header;