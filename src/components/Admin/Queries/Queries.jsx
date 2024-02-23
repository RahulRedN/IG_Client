/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import QueryCard from "./QueryCard";
import classes from "./Queries.module.css";

function Queries() {
  const queries = [
    {
      name: "Sravan Krishna",
      email: "sravankrishna@gmail.com",
      subject: "Something related",
      phone: "9990009998",
      message:
        "I applied for a job a week ago, but I haven't received any updates on my application status. Can you provide information on how I can check the status, or is there a way to follow up with employers through the platform?",
    },
    {
      name: "Pavan Kumar",
      email: "pk@gmail.com",
      subject: "Something unrrelated",
      phone: "9012345678",
      message:
        "I've completed my profile, but I'm not getting as many job views as I expected. How can I improve my profile visibility to attract more employers?",
    },
    {
      name: "Rahul Reddy",
      email: "rahulreddy@gmail.com",
      subject: "Something wanted",
      phone: "8989899898",
      message:
        "I set up job alerts, but I'm receiving notifications for positions that don't match my preferences. How can I refine my job alerts to get more accurate and relevant job suggestions?",
    },
    {
      name: "Sonish Korada",
      email: "sonishkorada@gmail.com",
      subject: "Something unwanted",
      phone: "8009809878",
      message:
        "I'm having trouble uploading my resume and other documents. Is there a specific format or size requirement, or is there an alternative way to submit application materials?",
    },
    {
      name: "Khadar Basha",
      email: "khadarbasha@gmail.com",
      subject: "Something / everything",
      phone: "7889877678",
      message:
        "I forgot my password and am having difficulty resetting it. Can you guide me on how to reset my password or recover my account access?",
    },
  ];

  const [idx, setIdx] = useState(0);

  return (
    <div className="p-5 bg-gray-50">
      <h1 className="pl-6">QUERIES</h1>
      <div className={classes.queries_container}>
        {queries.map((queries, idx) => {
          return (
            <QueryCard
              key={idx + 1}
              idx={idx + 1}
              name={queries.name}
              email={queries.email}
              subject={queries.subject}
              phone={queries.phone}
              message={queries.message}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Queries;
