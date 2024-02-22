/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import classes from "./Queries.module.css";

function QueryCard({ name, email, subject, phone, message }) {
  const palette = [
    "#ef4444",
    "#f97316",
    "#f59e0b",
    "#84cc16",
    "#22c55e",
    "#10b981",
    "#14b8a6",
    "#06b6d4",
    "#0ea5e9",
    "#3b82f6",
    "#6366f1",
    "#8b5cf6",
    "#a855f7",
  ];
  const randColor = (palette) => {
    var len = palette.length;
    var x = Math.floor(Math.random() * len);
    return palette[x];
  };

  return (
    <div className={classes.contact_feedback_card}>
      <div className={classes.contact_header}>
        <div
          className={classes.name_icon}
          style={{ backgroundColor: randColor(palette) }}
        >
          <p>{name[0]}</p>
        </div>
        <div className={classes.contact_header_info}>
          <p className={classes.contact_name}>{name}</p>
          <p className={classes.contact_email}>{email}</p>

          <p className={classes.contact_subject}>
            <span className={classes.subject_span}>Sub: </span>
            {subject}
          </p>
          <p className={classes.contact_date}>18/02/2024</p>
        </div>
      </div>
      <div className={classes.contact_message}>{message}</div>
      <div className={classes.contact_respond}>
        <button
          type="button"
          className={classes.ignore_button + " " + classes.btn}
        >
          Ignore
        </button>
        <button
          type="button"
          className={classes.respond_button + " " + classes.btn}
        >
          Respond
        </button>
      </div>
    </div>
  );
}

export default QueryCard;
