import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import Sessions from "./Sessions";

const CalendarComponent = () => {
  const [date, setDate] = useState(new Date());
  const [bookedSessions, setBookedSessions] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3007/sessions/calendar/booked")
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          return res.json();
        } else {
          throw new Error(
            `Encountered something unexpected: ${res.status} ${res.statusText}`
          );
        }
      })
      .then((data) => {
        setBookedSessions(data);

        console.log("bookedSessions", bookedSessions);
      })
      .catch((Error) => {
        console.log(Error);
      });
  }, []);
  console.log("bookedSessions", bookedSessions);
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  function tileClassName({ date, view }) {
    if (
      view === "month" &&
      bookedSessions.some((session) => {
        return session.date === formatDate(date);
      })
    ) {
      const session = bookedSessions.find(
        (session) => session.date === formatDate(date)
      );

      if (session.volunteer_no === "0") {
        return "react-calendar__tile--now";
      } else if (session.volunteer_no === "1") {
        return "green";
      } else if (session.volunteer_no === "2") {
        return "pink";
      }
    }
  }
  return (
    <div>
      <h6 className="h4 mt-5 font-li">
        DEAR VOLUNTEER, TO BOOK A SESSION, PLEASE CHOOSE THE DATE <br /> AND
        PRESS <strong>CLAIM</strong> BUTTON BELOW
      </h6>
      <div className="container calendar-container">
        <div className="row">
          <div className="col-lg-6">
            <div className="calendar">
              <Calendar
                tileClassName={tileClassName}
                onChange={setDate}
                value={date}
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="sessions">
              <Sessions selectedDate={formatDate(date)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarComponent;
