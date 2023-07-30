import CalendarBody from "./CalendarBody";
import CalendarHead from "./CalendarHead";
import "./calendar.css";

const Calendar = () => {
  return (
    <div className="calendar_container">
      {/* <div className="calendar_header">Calendar Header</div> */}
      <div className="calendar_body">
        <CalendarHead />
        <CalendarBody />
      </div>
    </div>
  );
};

export default Calendar;
