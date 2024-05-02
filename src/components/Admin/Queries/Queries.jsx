import React, { useState, useEffect } from "react";
import QueryCard from "./QueryCard";
import classes from "./Queries.module.css";
import axios from "axios";

function Queries() {
  const [queries, setQueries] = useState([]);

  useEffect(() => {
    fetchQueries();
  }, []);

  const fetchQueries = async () => {
    try {
      const res = await axios.get(import.meta.env.VITE_SERVER +"/api/admin/getqueries",
    {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
    });
      setQueries(res.data.queries);
    } catch (error) {
      console.error("Error fetching queries:", error);
    }
  };

  return (
    <div className="p-5 bg-gray-50">
      <h1 className="pl-6">QUERIES</h1>
      <div className={classes.queries_container}>
        {queries.map((query, idx) => (
          <QueryCard
            key={query._id}
            id={query._id}
            name={query.name}
            email={query.email}
            subject={query.subject}
            phone={query.phone}
            message={query.message}
            setQueries={setQueries}
          />
        ))}
      </div>
    </div>
  );
}

export default Queries;
