import React from "react";
import EventsComponents from "../Events/EventsComponents";
import { useContext } from "react";
import { CalendarContext } from "../../context/CalendarContext";
import WeekDaysNames from "./WeekDaysNames";
import { useState, useEffect } from "react";

const MonthlyCalendar = () => {
  const {
    totalDays,
    selectedDate,
    setCalendarEvent,
    setAddEvent,
    setSelectedDate,
    eventsArray,
    setCreateEvent,
    showEvent,
    setShowEvent,
  } = useContext(CalendarContext);

  return (
    <>
      {totalDays.map(({ isCurrentMonth, isToday, date }, idx) => {
        return (
          <ul
            key={idx}
            className={` all_days ${
              isCurrentMonth ? "currentMonth" : "notCurrentMonth"
            } ${isToday ? "today" : ""} td  ${
              date.toString() === selectedDate.toString() ? "selectedDay" : ""
            }`}
          >
            <li
              className={`${
                date.toString() === selectedDate.toString()
                  ? "selectedDate"
                  : ""
              }`}
            >
              <span
                className="dayDate"
                onClick={() => {
                  setSelectedDate(date);
                  setCreateEvent(date);
                  setAddEvent(true);
                }}
              >
                {date.date()}
              </span>
            </li>
            {
              <EventsComponents
                setCalendarEvent={setCalendarEvent}
                setAddEvent={setAddEvent}
                date={date}
                setSelectedDate={setSelectedDate}
                eventsArray={eventsArray}
                showEvent={showEvent}
                setShowEvent={setShowEvent}
              />
            }
          </ul>
        );
      })}
    </>
  );
};

export default MonthlyCalendar;
