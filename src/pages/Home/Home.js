import React from "react";
import Calendar from "../../components/Calendar/Calendar";
import "./home.css";
import CalendarContextPorvider from "../../context/CalendarContext";

const Home = () => {
  return (
    <CalendarContextPorvider>
      <div className="home_container">
        <Calendar />
      </div>
    </CalendarContextPorvider>
  );
};

export default Home;
