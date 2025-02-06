import React from "react";
import "./testimonials.css";

const Testimonials = () => {
  const testimonialsData = [
    {
      id: 1,
      name: "James",
      position: "Student",
      message:
        "I'm so impressed with the quality of the courses here. The instructors are knowledgeable, and the lessons are designed to keep you engaged from start to finish!",
      image:
        "https://media.istockphoto.com/id/1438969575/photo/smiling-young-male-college-student-wearing-headphones-standing-in-a-classroom.jpg?s=612x612&w=0&k=20&c=yNawJP9JGXU6LOL262ME5M1U2xxNKQsvT7F9DZhZCh4=",
    },
    {
      id: 2,
      name: "Adam",
      position: "Student",
      message:
        "I've never experienced such an engaging learning environment! The content is well-structured, and the instructors make even complex topics easy to understand.",
      image:
        "https://thumbs.dreamstime.com/b/young-hispanic-teenager-student-smiling-confident-listening-to-music-street-308013971.jpg",
    },
    {
      id: 3,
      name: "Jennifer",
      position: "Student",
      message:
        "This platform has completely transformed the way I learn. The interactive courses and real-world applications make the experience truly valuable!",
      image:
        "https://blog.planbook.com/wp-content/uploads/2022/02/image1-3.jpg",
    },
    {
      id: 4,
      name: "Sophia",
      position: "Student",
      message:
        "Learning has never been this enjoyable! The courses are well-paced, the explanations are clear, and I feel like I'm actually retaining what I learn.",
      image:
        "https://media.istockphoto.com/id/1278978323/photo/school-girl-holding-digital-tablet-in-college.jpg?s=612x612&w=0&k=20&c=8LWEdFHP529lw0ReuTKbFD5zRP94yEdTHqZrgsCu0LU=",
    },
  ];
  return (
    <section className="testimonials">
      <h2>What our students say</h2>
      <div className="testmonials-cards">
        {testimonialsData.map((e) => (
          <div className="testimonial-card" key={e.id}>
            <div className="student-image">
              <img src={e.image} alt="" />
            </div>
            <p className="message">{e.message}</p>
            <div className="info">
              <p className="name">{e.name}</p>
              <p className="position">{e.position}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;