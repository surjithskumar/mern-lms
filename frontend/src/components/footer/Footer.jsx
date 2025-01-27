import React from "react";
import "./footer.css";
import { FaGithubAlt, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <p>
            {/* for copyright symbol */}
          &copy; 2024 Your E-Learning Platform. All rights reserved. <br /> Made
          with ❤️ <a href="">Surjith</a>
        </p> 
        {/* windows + . for symbols */}
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
    </footer>
  );
};

export default Footer;