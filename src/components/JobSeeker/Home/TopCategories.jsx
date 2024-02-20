import React from "react";

import classes from "./TopJobs.module.css";
import CategoryCard from "../cards/CategoryCard";

import { Boxes, LineChart, Database } from "lucide-react";

import { RiTeamLine } from "react-icons/ri";

const TopCategories = () => {
  const categories = [
    {
      SVG: <Boxes strokeWidth={0.5} size={40} />,
      title: "UI/UX Designer",
      desc: "Crafting visually appealing, intuitive interfaces, focusing on seamless user experiences .",
      link: "findJobs?filter=Designer",
    },
    {
      SVG: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-user-round-cog"
        >
          <path d="M2 21a8 8 0 0 1 10.434-7.62" />
          <circle cx="10" cy="8" r="5" />
          <circle cx="18" cy="18" r="3" />
          <path d="m19.5 14.3-.4.9" />
          <path d="m16.9 20.8-.4.9" />
          <path d="m21.7 19.5-.9-.4" />
          <path d="m15.2 16.9-.9-.4" />
          <path d="m21.7 16.5-.9.4" />
          <path d="m15.2 19.1-.9.4" />
          <path d="m19.5 21.7-.4-.9" />
          <path d="m16.9 15.2-.4-.9" />
        </svg>
      ),
      title: "Development",
      desc: "Pioneering solutions with passionate coders, pushing technological boundaries for innovative and future-proof applications.",
      link: "findJobs?filter=Dev",
    },
    {
      SVG: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-badge-indian-rupee"
        >
          <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
          <path d="M8 8h8" />
          <path d="M8 12h8" />
          <path d="m13 17-5-1h1a4 4 0 0 0 0-8" />
        </svg>
      ),
      title: "Marketing",
      desc: "Driving brand awareness with strategic, data-driven campaigns, capturing audience interest through compelling content.",
      link: "findJobs?filter=Marketing",
    },
    {
      SVG: <LineChart size={40} strokeWidth={1.25} />,
      title: "Analyst",
      desc: "Delving into data for valuable insights, guiding informed decisions, and optimizing processes by interpreting trends.",
      link: "findJobs?filter=Analyst",
    },
    {
      SVG: <Database size={40} strokeWidth={1.25} />,
      title: "Accounting",
      desc: "Meticulously managing financial records, ensuring compliance, and maintaining fiscal health through precise .",
      link: "findJobs?filter=Accounting",
    },
    {
      SVG: <RiTeamLine size={40} />,
      title: "Management",
      desc: "Providing leadership, fostering a positive work culture, and guiding the organization toward strategic.",
      link: "findJobs?filter=Management",
    },
  ];
  return (
    <div className={classes.container}>
      <div className={classes.infoCat}>
        <h1>Browse From Our Top Categories</h1>
      </div>
      <div className={classes.topCategories}>
        {categories.map((cat, idx) => (
          <CategoryCard
            delay={0.1 * idx}
            title={cat.title}
            desc={cat.desc}
            SVG={cat.SVG}
            key={idx}
            link={cat.link}
          />
        ))}
      </div>
    </div>
  );
};

export default TopCategories;
