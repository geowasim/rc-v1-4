import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import "./calendar.css";
import { useContext } from "react";
import { CalendarContext } from "../../context/CalendarContext";
import EventsComponents from "../Events/EventsComponents";

export default function DailyCalendar() {
  const {
    currentDate,
    eventsArray,
    setCalendarEvent,
    setShowEvent,
    setSelectedDate,
  } = useContext(CalendarContext);
  console.log("currentDate", currentDate);
  const [timeSlots, setTimeSlots] = useState([]);
  console.log(timeSlots);
  useEffect(() => {
    const time = [];
    for (let i = 0; i < 24; i++) {
      time.push(currentDate.startOf("day").add(i, "hour").format("h:mm A"));
    }
    setTimeSlots(time);
  }, [currentDate, eventsArray]);
  // const handlePrevDay = () => {
  //   setDate(date.subtract(1, "day"));
  // };

  // const handleReset = () => {
  //   setDate(currentDate);
  // };

  // const handleNextDay = () => {
  //   setDate(date.add(1, "day"));
  // };

  return (
    <div className="daily-calendar">
      <div className="daily-calendar-header">
        {/* <button onClick={handlePrevDay}>prev</button>
        <button onClick={handleNextDay}>next</button>
        <button onClick={handleReset}>reset</button> */}
        <h2>{currentDate.format("dddd")}</h2>
      </div>
      <table className="daily-calendar-table">
        <tbody>
          {timeSlots.map((timeSlot) => {
            console.log(
              currentDate
                .startOf("day")
                .add(timeSlots.indexOf(timeSlot), "hour")
                .valueOf()
            );
            return (
              <tr key={timeSlot}>
                <td className="daily-time-slot">{timeSlot}</td>
                <td className="daily-calendar-cell">
                  <EventsComponents
                    date={currentDate
                      .startOf("day")
                      .add(timeSlots.indexOf(timeSlot), "hour")}
                    eventsArray={eventsArray}
                    setCalendarEvent={setCalendarEvent}
                    setShowEvent={setShowEvent}
                    setSelectedDate={setSelectedDate}
                  />
                  {currentDate
                    .startOf("day")
                    .add(timeSlots.indexOf(timeSlot), "hour")
                    .valueOf()}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
