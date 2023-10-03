import React, { useState } from "react";
import Calendar from "react-calendar";
import Sessions from "./Sessions";

const CalendarComponent = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="calendar-container">
      <Calendar onChange={setDate} value={date} />
      <div className="text-center">
        Selected date: {date.toDateString()}
      </div>{" "}
      {console.log(date.toISOString())}
      <Sessions selectedDate={date.toISOString().split("T")[0]} />
    </div>
  );
};

export default CalendarComponent;
