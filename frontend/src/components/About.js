import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/About.css";

export default function About() {
  const navigate = useNavigate();
  return (
    <div className="aboutcontainer">
      <div className="nameoftheproject">
        <h4 className="namename">Name</h4>
        <h4 className="projectname">Real Time Data Analysis</h4>
      </div>
      <div className="aimoftheproject">
        <h4 className="aimname">Aim</h4>
        <h4 className="aimcontent">
          The Real Time Streaming Data Web Deployment project aims to provide a
          robust and scalable platform for the seamless visualization and
          analysis of real-time data. It is designed to handle high-volume data
          streams, ensuring timely and accurate information delivery to
          end-users. The project seeks to empower users with dynamic data
          insights, enhancing decision-making processes across various
          industries.
        </h4>
      </div>
      <div className="objectivesoftheproject">
        <h4 className="objectivename">Objectives</h4>
        <ul className="objectivescontent">
          <li>
            Develop a user-friendly web interface that allows for the real-time
            visualization of streaming data.
          </li>
          <li>
            Implement efficient data processing and storage mechanisms to manage
            large volumes of streaming data.
          </li>
          <li>
            Provide end-users with real-time insights and actionable insights
            that can be leveraged for business decision-making.
          </li>
          <li>
            Ensure high availability and scalability of the platform to
            accommodate growing data demands.
          </li>
        </ul>
      </div>
      <div className="usecasesoftheproject">
        <h4 className="usecasename">Use Cases</h4>
        <ul className="usecasescontent">
          <li>
            Financial Services: Real-time monitoring of stock market data,
            enabling traders and analysts to make informed decisions quickly.
          </li>
          <li>
            Healthcare: Live tracking of patient vitals and hospital resource
            utilization, improving response times and patient care.
          </li>
          <li>
            IoT and Smart Cities: Continuous data collection from sensors and
            devices, facilitating efficient city management and responsive
            infrastructure services.
          </li>
          <li>
            E-commerce: Real-time analytics on user behavior and sales trends,
            allowing for dynamic inventory management and targeted marketing
            strategies.
          </li>
        </ul>
      </div>
    </div>
  );
}
