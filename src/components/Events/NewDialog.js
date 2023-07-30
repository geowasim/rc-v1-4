import React, { useState, useEffect } from "react";
import DateRange from "./DateRange";
import dayjs from "dayjs";
import "./style.css";
import { useContext } from "react";
import { CalendarContext } from "../../context/CalendarContext";

const NewDialog = () => {
  const {
    setAddEvent,
    addEvent,
    selectedDate,
    eventsArray,
    setEventsArray,
    setCreateEvent,
    calendarEvent,
    setSelectedDate,
    setCalendarEvent,
    showEvent,
    setShowEvent,
    createEvent,
  } = useContext(CalendarContext);
  const chosenDate = selectedDate.hour(dayjs().hour()).toDate();
  const [addTitle, setAddTitle] = useState("");
  const [startDate, setStartDate] = useState(chosenDate);
  const [endDate, setEndDate] = useState(chosenDate);
  const [message, setMessage] = useState("");
  const [eventLocation, setEventLocation] = useState("");

  useEffect(() => {
    if (showEvent) {
      setAddTitle(calendarEvent.title);
      setStartDate(calendarEvent.startDate);
      setEndDate(calendarEvent.endDate);
      setMessage(calendarEvent.message);
      setEventLocation(calendarEvent.location);
    }
  }, [showEvent]);
  function handleTextAreaChange(e) {
    setMessage(e.target.value);
  }
  function handleChange(e) {
    setAddTitle(e.target.value);
  }
  function handleEventLocation(e) {
    setEventLocation(e.target.value);
  }

  const handleEdit = (calendarEvent) => {
    // find in arrary
    const newArrays = eventsArray.map((item) => {
      if (item.id === calendarEvent.id) {
        return {
          ...item,
          title: addTitle,
          message: message,
          startDate: startDate,
          endDate: endDate,
          location: eventLocation,
        };
      }
      return item;
    });
    setEventsArray(newArrays);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (createEvent) {
      const newEventsArray = {
        id: new Date().valueOf(),
        date: dayjs(dayjs(selectedDate).format("YYYY MM DD")),
        startDate: startDate,
        endDate: endDate,
        title: `${addTitle}`,
        location: eventLocation.length > 0 ? eventLocation : "__",
        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        background: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        type: "Event",
        message: message,
      };
      setEventsArray([...eventsArray, newEventsArray]);
      setAddTitle("");
      setAddEvent(!addEvent);
      setSelectedDate("");
      setCreateEvent(null);
      setCalendarEvent(null);
      setEventLocation("");
    } else {
      setAddEvent(false);
      handleEdit(calendarEvent);
      setCalendarEvent(null);
    }
  };

  const handleDelete = (id) => {
    const newEventsArray = eventsArray.filter((e) => e.id !== id);
    setEventsArray(newEventsArray);
    setAddEvent(false);
    setCreateEvent(null);
    setCalendarEvent(null);
    setShowEvent(false);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setAddEvent(false);
    setCreateEvent(null);
    setCalendarEvent(null);
    setShowEvent(false);
    setSelectedDate("");
  };

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  if (addEvent) {
    return (
      <>
        {/* add event */}
        {addEvent && (
          <div className="mm-popup mm-popup--visible">
            <div className="mm-popup__overlay"></div>
            <form className="mm-popup__box" onSubmit={(e) => handleSubmit(e)}>
              <button
                className="mm-popup__close"
                onClick={(e) => handleCancel(e)}
              ></button>
              <header className="mm-popup__box__header">
                <h1 className="mm-popup__box__header__title">Create Event</h1>
              </header>
              <div className="mm-popup__box__body">
                <DateRange
                  startDate={startDate}
                  endDate={endDate}
                  setStartDate={setStartDate}
                  setEndDate={setEndDate}
                />
                <div>
                  <input
                    type="text"
                    tabIndex={-1}
                    placeholder="Event Title"
                    className="mm-popup__input"
                    name="title"
                    value={addTitle}
                    onChange={(e) => handleChange(e)}
                    onKeyDown={handleKeypress}
                    required
                    autoFocus
                  ></input>
                  <input
                    type="text"
                    tabIndex={0}
                    placeholder="Event Location"
                    className="mm-popup__input"
                    value={eventLocation}
                    onChange={(e) => handleEventLocation(e)}
                    name="location"
                  ></input>

                  <textarea
                    className="mm-popup__input textarea"
                    name="textArea"
                    placeholder="Describe event"
                    value={message}
                    rows={4}
                    onChange={(e) => handleTextAreaChange(e)}
                  />
                </div>
              </div>
              <footer className="mm-popup__box__footer">
                <div className="mm-popup__box__footer__left-space">
                  <button
                    type="button"
                    className="mm-popup__btn mm-popup__btn--cancel"
                    onClick={(e) => handleCancel(e)}
                    tabIndex={1}
                  >
                    Cancel
                  </button>
                </div>
                <div className="mm-popup__box__footer__right-space">
                  <button
                    type="submit"
                    className="mm-popup__btn mm-popup__btn--success"
                    tabIndex={2}
                  >
                    Save
                  </button>
                </div>
              </footer>
            </form>
          </div>
        )}
      </>
    );
  } else if (showEvent) {
    return (
      <>
        {showEvent && (
          <div className="mm-popup mm-popup--visible">
            <div role="presentation" className="mm-popup__overlay"></div>
            <article
              role="dialog"
              tabIndex="0"
              className="mm-popup__box"
              style={{ opacity: "1", outline: "none" }}
            >
              <button
                className="mm-popup__close"
                onClick={(e) => handleCancel(e)}
              ></button>
              <header className="mm-popup__box__header">
                <h1 className="mm-popup__box__header__title">
                  Title : {calendarEvent.title}
                </h1>
              </header>
              <div className="mm-popup__box__body">
                <div>
                  <p>
                    Date start: <strong>{startDate.toDateString()}</strong>
                  </p>
                  <p>
                    Date End: <strong>{endDate.toDateString()}</strong>
                  </p>
                  <p>Location: {calendarEvent.location}</p>
                </div>
              </div>
              <footer className="mm-popup__box__footer">
                <div className="mm-popup__box__footer__left-space"></div>
                <div className="mm-popup__box__footer__right-space">
                  <button
                    className="mm-popup__btn mm-popup__btn--info"
                    onClick={() => {
                      setShowEvent(false);
                      setAddEvent(true);
                      console.log("edit");
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="mm-popup__btn mm-popup__btn--danger"
                    onClick={() => {
                      handleDelete(calendarEvent.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </footer>
            </article>
          </div>
        )}
      </>
    );
  }
};

export default NewDialog;
