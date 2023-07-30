import WeekDaysNames from "./WeekDaysNames";
import TotalDays from "./TotalDays";
import { useEffect } from "react";
import { useContext } from "react";
import { CalendarContext } from "../../context/CalendarContext";

export const MonthCalendar = () => {
  const { eventsArray } = useContext(CalendarContext);
  return (
    <div className="table">
      <div className="thead">
        <WeekDaysNames />
      </div>
      <div className="tbody">
        <TotalDays eventsArray={eventsArray} />
      </div>
    </div>
  );
};
