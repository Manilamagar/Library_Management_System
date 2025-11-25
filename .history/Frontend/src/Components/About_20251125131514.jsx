import React from ""
import "./About.css";

function About() {
  return (
    <div className="about-box">
      <h2 className="about-title">About INC Pustakalaya</h2>

      <div className="about-data">
        {/* Left Image */}
        <div className="about-img">
          <img
            src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1200"
            alt="Library"
          />
        </div>

        {/* Right Text Section */}
        <div>
          <p className="about-text">
            <strong>INC Pustakalaya</strong> is the official Library Management
            System of <strong>Itahari Namuna College</strong>, designed to make
            library services faster, smarter, and completely digital.
            <br />
            <br />
            Our goal is to provide students and faculty with quick access to
            books, seamless borrowing experience, and real-time updates of
            book availability. The system is developed with modern technologies
            like <strong>React, Node.js, and MySQL</strong> to ensure speed,
            security, and reliability.
            <br />
            <br />
            The digital library helps users:
            <br />• Search books instantly  
            <br />• Borrow and return books online  
            <br />• View book categories and availability  
            <br />• Receive updates from the library  
            <br />
            <br />
            INC Pustakalaya is continuously being improved to support new
            features and provide a user-friendly learning environment for
            students of BCA, BHM, BSW, and +2 programs.
            <br />
            <br />
            <strong>Your feedback and suggestions are always appreciated!</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
