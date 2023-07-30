import { useState, createContext } from "react";
import dayjs from "dayjs";
import weekdayPlugin from "dayjs/plugin/weekday";
import { generateDate } from "../utils/arrayOfDate";

// location setting "Poland";
dayjs().locale("pl");
dayjs.extend(weekdayPlugin);

const defaultDate = dayjs();
const calendarOptions = ["Month", "Week", "Day"];

export const CalendarContext = createContext();

function CalendarContextPorvider(props) {
  const [currentDate, setCurrentDate] = useState(defaultDate);
  const [viewOption, setViewOption] = useState(calendarOptions[0]);

  const [selectedDate, setSelectedDate] = useState("");
  const [calendarEvent, setCalendarEvent] = useState(null);
  const [createEvent, setCreateEvent] = useState(null);
  const [addEvent, setAddEvent] = useState(false);
  const [showEvent, setShowEvent] = useState(false);
  const [eventsArray, setEventsArray] = useState([]);
  let month = currentDate.month();
  let year = currentDate.year();
  let totalDays = generateDate(month, year);

  function dateUpdater(date) {
    setCurrentDate(date);
  }
  function viewOptionChanger(val) {
    setViewOption(val);
  }
  return (
    <CalendarContext.Provider
      value={{
        defaultDate,
        currentDate,
        calendarOptions,
        viewOption,
        viewOptionChanger,
        dateUpdater,
        selectedDate,
        calendarEvent,
        createEvent,
        addEvent,
        showEvent,
        eventsArray,
        setSelectedDate,
        setCalendarEvent,
        setCreateEvent,
        setAddEvent,
        setShowEvent,
        setEventsArray,
        totalDays,
      }}
    >
      {props.children}
    </CalendarContext.Provider>
  );
}
export default CalendarContextPorvider;
