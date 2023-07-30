import { CalendarContext } from "../../context/CalendarContext";
import { useState, useContext, useEffect, useRef } from "react";
import dayjs from "dayjs";
import EventsComponents from "../Events/EventsComponents";

// getCurrentWeekDays from currentDate array[M,M,,,,M]
// map and render M.startOf("day").add(i,"hour").valueOf()

const WeeklyCalendar = () => {
  const {
    currentDate,
    defaultDate,
    setCalendarEvent,
    setAddEvent,
    date,
    setSelectedDate,
    eventsArray,
    setShowEvent,
    showEvent,
    viewOption,
  } = useContext(CalendarContext);

  console.log(eventsArray);

  //find the row present the day eg 3/7,, then check the time that present the column(position)
  //the style will change according the time start and end (height)
  const [currentWeekDays, setCurrentWeekDays] = useState([]);
  useEffect(() => {
    const arrayOfDays = () => {
      const start = currentDate.startOf("week");
      const days = [];
      for (let i = 0; i < 7; i++) {
        days.push(start.add(i, "day"));
      }
      return days;
    };
    setCurrentWeekDays(arrayOfDays);
  }, [currentDate]);
  console.log(currentWeekDays);

  const slotRef = useRef(null);
  const handleClickRect = () => {
    const rect = slotRef.current.getBoundingClientRect();
    console.log("width: ", rect.width);
    console.log("height", rect.height);
    console.log("x:", rect.offset);
    console.log("y:", rect.offset);
  };

  const [cellPosition, setCellPosition] = useState({});

  useEffect(() => {
    console.log(cellPosition);
  }, [cellPosition]);

  const handleCellClick = (event) => {
    const cellRect = event.target.getBoundingClientRect();
    setCellPosition({
      x: cellRect.x,
      y: cellRect.y,
      top: cellRect.top,
      left: cellRect.left,
    });
  };

  const startTime = currentDate.startOf("day");
  const endTime = currentDate.endOf("day");
  const timeTable = [];

  //with this loop more option to extend the time 30, 15 ,,, min
  for (let i = startTime; i <= endTime; i = i.add(1, "hour")) {
    timeTable.push(i.format("h:mm A"));
  }

  return (
    <>
      <div className="table-week-container">
        <table className="week">
          <thead>
            <tr>
              <th className="week-header">Time/Date</th>

              {[...Array(7).keys()].map((_, index) => (
                <th key={index} className="week-header">
                  <span className="weekday">
                    {currentDate
                      .startOf("week")
                      .add(index, "day")
                      .format("ddd")}{" "}
                  </span>
                  <span className="weekdates">
                    {" "}
                    {currentDate
                      .startOf("week")
                      .add(index, "day")
                      .format("DD/MM")}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeTable.map((item) => {
              return (
                <tr key={item} onClick={handleCellClick}>
                  <td className="week-time-column">{item}</td>
                  {currentWeekDays.map((day, index) => {
                    return (
                      <td
                        ref={slotRef}
                        key={`${index}-${item}`}
                        id={day
                          .startOf("day")
                          .add(timeTable.indexOf(item), "hour")
                          .valueOf()}
                        className="event-slot"
                        onClick={() => {
                          console.log(
                            "eventSlot",
                            `${day
                              .startOf("day")
                              .add(timeTable.indexOf(item), "hour")
                              .valueOf()}`
                          );

                          console.log(
                            "val",
                            dayjs(
                              day
                                .startOf("day")
                                .add(timeTable.indexOf(item), "hour")
                            )
                          );

                          handleClickRect();
                        }}
                      >
                        <EventsComponents
                          date={day
                            .startOf("day")
                            .add(timeTable.indexOf(item), "hour")}
                          eventsArray={eventsArray}
                          setCalendarEvent={setCalendarEvent}
                          setShowEvent={setShowEvent}
                          setSelectedDate={setSelectedDate}
                          setAddEvent={setAddEvent}
                        />
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="week-footer"></div>
    </>
  );
};

export default WeeklyCalendar;
