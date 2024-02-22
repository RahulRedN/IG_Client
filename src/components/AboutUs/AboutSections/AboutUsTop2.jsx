import AboutUsTop2Cards from "./AboutUsTop2Cards";
import classes from "../AboutSections/Styles/AboutUsTop2.module.css";

const AboutUsTop2 = () => {
  
  return (
    
    <div className={classes.AboutUsTop2}>
      <div className={classes.WhatWeServe}>
        <h3>What We Serve</h3>
        <h2>
          We help You To Find <br />
          The Right Choice
        </h2>
        <p>
        Dedicated to finding your ideal match. We specialize in personalized services, ensuring your journey is marked by strategic choices and unparalleled success. Unleash 
        </p>
      </div>

      <div className={classes.AboutUsTop2CardsContainer}>
        <AboutUsTop2Cards />
      </div>
    </div>
   
  );
};

export default AboutUsTop2;
