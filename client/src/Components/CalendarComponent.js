import React, { useState } from "react";
import Calendar from "react-calendar";
import Sessions from "./Sessions";

const CalendarComponent = () => {
  const [date, setDate] = useState(new Date());

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="calendar-container">
      <Calendar onChange={setDate} value={date} />
      <Sessions selectedDate={formatDate(date)} />
    </div>
  );
};

export default CalendarComponent;
