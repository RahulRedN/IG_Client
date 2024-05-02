import React from "react";
import axios from "axios";
import classes from "./Queries.module.css";

function QueryCard({ name, email, subject, phone, message, id, setQueries }) {
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

  const handleIgnore = async () => {
    console.log(id);
    try {
      const res = await axios.delete(
        import.meta.env.VITE_SERVER + "/api/home/ignoreQuery",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          data: {
            id,
          },
        }
      );
      if (res.status == 200) {
        setQueries((state) => state.filter((que) => que._id != id));
      }
      console.log("Query ignored successfully");
    } catch (error) {
      console.error("Error ignoring query:", error);
    }
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
          onClick={handleIgnore}
        >
          Ignore
        </button>
      </div>
    </div>
  );
}

export default QueryCard;
