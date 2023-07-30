import NewDialog from "../Events/NewDialog";
import WeeklyCalendar from "./WeeklyCalendar";
import DailyCalendar from "./DailyCalendar";
import { useContext } from "react";
import { CalendarContext } from "../../context/CalendarContext";
import { MonthCalendar } from "./MonthlyCalendar";

const CalendarBody = () => {
  const { viewOption, addEvent, showEvent } = useContext(CalendarContext);

  return (
    <>
      {(addEvent || showEvent) && (
        //events create Dialog
        <NewDialog />
      )}
      {viewOption === "Month" && <MonthCalendar />}
      {viewOption === "Week" && <WeeklyCalendar />}
      {viewOption === "Day" && <DailyCalendar />}
    </>
  );
};

export default CalendarBody;
