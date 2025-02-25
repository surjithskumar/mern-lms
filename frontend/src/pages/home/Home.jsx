import React, { useEffect } from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";
import Testimonials from "../../components/testimonials/Testimonials";
import CourseCard from "../../components/coursecard/CourseCard";
import { CourseData } from "../../context/CourseContext";

const Home = () => {
  const navigate = useNavigate();
  const { courses } = CourseData();

  return (
    <div>
      <div className="home">
        <div className="home-content">
          <h1>Learn From Anywhere, Anytime</h1>
          <p>Be a part of Next-Gen Learning</p>
        </div>
        <div className="courses">
        <div className="course-container">
          {courses && courses.length > 0 ? (
            courses.map((e) => <CourseCard key={e._id} course={e} />)
          ) : (
            <p>No Courses Yet!</p>
          )}
        </div>
        </div>
        <button onClick={() => navigate("/courses")} className="common-btn">
            Explore More Courses
          </button>
      </div>
      <Testimonials />
    </div>
  );
};

export default Home;