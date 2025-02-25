import React from "react";
import "./about.css";
import { FaGithubAlt, FaLinkedin, FaTwitter } from "react-icons/fa";

const About = () => {
  return (
    <div className="about">
      <div className="about-content">
        <h2>About Us</h2>
        <p>
          We are dedicated to providing high quality online courses to help
          individuals learn and grow in their desired fields. Our experienced
          instruction ensure that each course is tailored for effective learning
          and practical application.
        </p>
        <h4>Follow Us On</h4>
        <div className="social-links">
          <a href="">
            <FaGithubAlt />
          </a>
          <a href="">
            <FaTwitter />
          </a>
          <a href="">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;