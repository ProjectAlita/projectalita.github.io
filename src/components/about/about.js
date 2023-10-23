
// We are working with ReactJS
// Create an About section, that contains Hero like Label -  "Project Alita - focus on creative tasks rather then routine"
// section with the text being it sating how we do it
// on the right of the section we need to have a picture of architecture
import React from 'react';
import './about.css';
import img from './hub.png'

const About = () => {
  return (
    <div className="container">
      <div className="about">
        <h1>
          Project Alita
        </h1>
        <h3>
          focus on creative tasks rather than routine
        </h3>
        <p>
          At Project Alita, we believe in empowering individuals and teams to focus on what truly 
          matters - creativity and innovation. We achieving thins by offloading the routine tasks 
          to our AI-powered assistants
        </p>
        <div class="buttonRow">
          <button>Get Started</button>
          <button>Explore</button>
        </div>
      </div>
      <div className="hub-image">
        <img src={img} alt="hub" className="hub-img" />
      </div>
      {/* <div class="about-image">
        <img src={img} alt="platform" className="about-img" />
      </div> */}
    </div>
    
  );
};

export default About;
