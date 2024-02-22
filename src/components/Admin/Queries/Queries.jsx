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
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi dolorem       accusamus sed et ducimus eaque ipsa expedita sapiente error vero aut       aspernatur officia voluptatum quis, recusandae dolores, dolorum       praesentium. uiwebgv WEIBF eioqwubf WEYIOFB wg weg weg weg wg we gwegwe       wgrweg wefgaerg awrgawrg.",
    },
    {
      name: "Pavan Kumar",
      email: "pk@gmail.com",
      subject: "Something unrrelated",
      phone: "9012345678",
      message:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi dolorem       accusamus sed et ducimus eaque ipsa expedita sapiente error vero aut       aspernatur officia voluptatum quis, recusandae dolores, dolorum       praesentium. uiwebgv WEIBF eioqwubf WEYIOFB wg weg weg weg wg we gwegwe       wgrweg wefgaerg awrgawrg.",
    },
    {
      name: "Rahul Reddy",
      email: "rahulreddy@gmail.com",
      subject: "Something wanted",
      phone: "8989899898",
      message:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi dolorem       accusamus sed et ducimus eaque ipsa expedita sapiente error vero aut       aspernatur officia voluptatum quis, recusandae dolores, dolorum       praesentium. uiwebgv WEIBF eioqwubf WEYIOFB wg weg weg weg wg we gwegwe       wgrweg wefgaerg awrgawrg.",
    },
    {
      name: "Sonish Korada",
      email: "sonishkorada@gmail.com",
      subject: "Something unwanted",
      phone: "8009809878",
      message:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi dolorem       accusamus sed et ducimus eaque ipsa expedita sapiente error vero aut       aspernatur officia voluptatum quis, recusandae dolores, dolorum       praesentium. uiwebgv WEIBF eioqwubf WEYIOFB wg weg weg weg wg we gwegwe       wgrweg wefgaerg awrgawrg.",
    },
    {
      name: "Khadar Basha",
      email: "khadarbasha@gmail.com",
      subject: "Something / everything",
      phone: "7889877678",
      message:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi dolorem       accusamus sed et ducimus eaque ipsa expedita sapiente error vero aut       aspernatur officia voluptatum quis, recusandae dolores, dolorum       praesentium. uiwebgv WEIBF eioqwubf WEYIOFB wg weg weg weg wg we gwegwe       wgrweg wefgaerg awrgawrg.",
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
