import React from "react";
import { useContext } from "react";
import { CalendarContext } from "../../context/CalendarContext";

const WeekDaysNames = () => {
  const props = useContext(CalendarContext);
  const daysArray = [];
  for (let index = 0; index < 7; index++) {
    daysArray.push(props.defaultDate.weekday(index).format("ddd"));
  }
  return (
    <>
      {daysArray.length > 0 &&
        daysArray.map((day, idx) => (
          <div key={idx} className="tr">
            <span className="th">
              <a href="#ref">{day}</a>
            </span>
          </div>
        ))}
    </>
  );
};

export default WeekDaysNames;
