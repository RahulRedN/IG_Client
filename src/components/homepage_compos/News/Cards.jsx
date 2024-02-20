/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import toast  from "react-hot-toast";

const Cards = () => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = "8fbff4d924f245c38e8cd16eaf6a2264";
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}&category=business`
        );
        const data = await response.json();
        setNewsData(data.articles.slice(0, 18)); 
      } catch (error) {
        toast.error("Error fetching news data")
        console.error("Error fetching news data:", error);
      }
    };

  fetchData(); 

  }, []); 

  return (
    <div className="cards-cont">
      {newsData.map((data) => (
        <Card key={data.id} {...data} />
      ))}
    </div>
  );
};



const Card = ({ urlToImage, url, title, description }) => {

  const openUrlInNewTab = () => {
    if (url) {
      window.open(url, '_blank');
    } else {
     
      console.error("URL is not available");
    }
  };

  const [ref, inView] = useInView({
    triggerOnce: true, 
  });

  console.log(urlToImage);

  return (
    urlToImage && 
    <motion.div
      ref={ref}
      initial={{ x: 100, opacity: 0 }}
      animate={inView ? { x: 0, opacity: 1 } : "hidden"}
      transition={{ ease: "easeInOut", duration: 0.9, delay: 0.0 }}
      className="card-cont"
    >
      <img src={urlToImage} alt="" />
      <h1 className="que">{title}</h1>
      <p className="ans">{description}</p>
    
      <button className="btn-learn" onClick={openUrlInNewTab}>
        Learn More
      </button>

    </motion.div>
  );
};

export default Cards;
