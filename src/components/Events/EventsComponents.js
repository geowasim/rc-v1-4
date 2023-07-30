import React from "react";
import {
  compareTwoDates,
  compareTwoDatesInWeek,
} from "../../utils/arrayOfDate";
import { useContext } from "react";
import { CalendarContext } from "../../context/CalendarContext";
import dayjs from "dayjs";

const EventsComponents = ({
  setCalendarEvent,
  date,
  setSelectedDate,
  setShowEvent,
}) => {
  const { viewOption, eventsArray } = useContext(CalendarContext);
  return (
    <>
      {viewOption === "Month" && eventsArray.length > 0
        ? eventsArray.map((evnt, idx) => {
            return (
              compareTwoDates(dayjs(`${evnt.startDate}`), date) && (
                <p
                  className="event_block"
                  key={idx}
                  style={{
                    color: evnt.color,
                    // background: evnt.background,
                    border: "1px solid",
                  }}
                  onClick={() => {
                    setCalendarEvent(evnt);
                    setShowEvent(true);
                    setSelectedDate(date);
                  }}
                >
                  {evnt.title}
                </p>
              )
            );
          })
        : null}
      {viewOption === "Week" && eventsArray.length > 0
        ? eventsArray.map((evnt, idx) => {
            // console.log("ee", dayjs(`${evnt.startDate}`));

            return (
              compareTwoDatesInWeek(dayjs(`${evnt.startDate}`), date) && (
                <p
                  className="event_block"
                  key={idx}
                  style={{
                    color: evnt.color,
                    // background: evnt.background,
                    border: "1px solid",
                  }}
                  onClick={() => {
                    setCalendarEvent(evnt);
                    setShowEvent(true);
                    setSelectedDate(date);
                  }}
                >
                  {evnt.title}
                </p>
              )
            );
          })
        : null}
      {viewOption === "Day" && eventsArray.length > 0
        ? eventsArray.map((evnt, idx) => {
            return (
              compareTwoDatesInWeek(dayjs(`${evnt.startDate}`), date) && (
                <p
                  className="event_block"
                  key={idx}
                  style={{
                    color: evnt.color,
                    // background: evnt.background,
                    border: "1px solid",
                  }}
                  onClick={() => {
                    setCalendarEvent(evnt);
                    setShowEvent(true);
                    setSelectedDate(date);
                  }}
                >
                  {evnt.title}
                </p>
              )
            );
          })
        : null}
    </>
  );
};

export default EventsComponents;
