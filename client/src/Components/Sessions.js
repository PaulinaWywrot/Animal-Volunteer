import { useEffect, useState } from "react";
import ShowSelect from "./ShowSelect";
const Sessions = ({ selectedDate }) => {
  const [sessions, setSessions] = useState([]);
  const [showSelectMorning, setShowSelectMorning] = useState(false);
  const [showSelectEvening, setShowSelectEvening] = useState(false);
  useEffect(() => {
    fetch(
      `https://animal-volunteer-server.onrender.com/sessions/calendar/${selectedDate}`
    )
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
        setSessions(data);
      })
      .catch((Error) => console.log(Error));
  }, [selectedDate]);
  const toggleSelectMorning = () => {
    setShowSelectMorning(!showSelectMorning);
    console.log("morningHandler");
  };

  const toggleSelectEvening = () => {
    setShowSelectEvening(!showSelectEvening);
    console.log("eveningHandler");
  };
  return (
    <div className="centered-container">
      <ul className="list-unstyled custom-ul mt-5">
        {sessions.map((session) => (
          <li className="session mb-4 font-li" key={session.id}>
            <strong>{new Date(session.date).toLocaleDateString()}</strong>{" "}
            <br /> {session.slot} session is{" "}
            <strong>{session.volunteer_id ? "Booked" : "Available"}</strong>
            <button
              className={
                session.volunteer_id
                  ? "btn btn-outline-danger custom-margin-left"
                  : "btn btn-outline-success custom-margin-left"
              }
              onClick={
                session.slot === "Morning"
                  ? toggleSelectMorning
                  : toggleSelectEvening
              }
            >
              {session.volunteer_id ? "Cancel Booking" : "Claim"}
            </button>
            <ShowSelect
              showSelect={
                session.slot === "Morning"
                  ? showSelectMorning
                  : showSelectEvening
              }
              sessionId={session.id}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sessions;
