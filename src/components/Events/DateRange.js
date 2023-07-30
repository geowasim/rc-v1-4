import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import pl from "date-fns/locale/pl";
registerLocale("pl", pl);

const DateRange = ({ startDate, setStartDate, endDate, setEndDate }) => {
  return (
    <>
      <div className="date-picker-container">
        <div className="date-picker-selector">
          <p className="start-end">start: </p>
          <DatePicker
            className="mm-popup__input"
            selected={startDate}
            dateFormat="MMMM d, yyyy h:mmaa"
            onChange={(date) => setStartDate(date)}
            placeholderText="Select Start Date"
            showTimeSelect
            selectsStart
            startDate={startDate}
            endDate={endDate}
            isClearable
          />
        </div>
        <div className="date-picker-selector">
          <p className="start-end">End: </p>

          <DatePicker
            className="mm-popup__input"
            isClearable
            selected={endDate}
            dateFormat="MMMM d, yyyy h:mmaa"
            onChange={(date) => setEndDate(date)}
            selectsEnd
            placeholderText="Select End Date"
            showTimeSelect
            selectsStart
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
          />
        </div>
      </div>
    </>
  );
};

export default DateRange;
