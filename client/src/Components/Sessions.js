import { useEffect, useState } from "react";
import ShowSelect from "./ShowSelect";

const Sessions = ({ selectedDate }) => {
  const [sessions, setSessions] = useState([]);
  const [showSelectMorning, setShowSelectMorning] = useState(false);
  const [showSelectEvening, setShowSelectEvening] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [slotId, setSlotId] = useState(null);
  const doShowModal = () => {
    setShowModal(true);
  };
  const doHideModal = () => {
    setShowModal(false);
  };
  useEffect(() => {
    setIsLoading(true);
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
        setIsLoading(false);
        setSessions(data);
        console.log("sessions", sessions);
      })
      .catch((Error) => {
        setIsLoading(false);
        console.log(Error);
      });
  }, [selectedDate, showSelectMorning, showSelectEvening, showModal]);
  const toggleSelectMorning = () => {
    setShowSelectMorning(!showSelectMorning);
  };

  const toggleSelectEvening = () => {
    setShowSelectEvening(!showSelectEvening);
  };

  return (
    <div className="centered-container">
      {isLoading ? (
        <h3 className="loading">Loading...</h3>
      ) : (
        <ul className="list-unstyled custom-ul mt-5">
          {sessions.map((session) => (
            <li className="session mb-4 font-li" key={session.id}>
              <strong>{new Date(session.date).toLocaleDateString()}</strong>{" "}
              <br /> {session.slot} session is{" "}
              <strong>{session.volunteer_id ? "Booked" : "Available"}</strong>
              {session.volunteer_id ? (
                <button
                  className="btn btn-outline-danger custom-margin-left"
                  onClick={() => {
                    doShowModal();
                    setSlotId(session.id);
                  }}
                >
                  Cancel Booking
                </button>
              ) : (
                <button
                  className="btn btn-outline-success custom-margin-left"
                  onClick={
                    session.slot === "Morning"
                      ? toggleSelectMorning
                      : toggleSelectEvening
                  }
                >
                  Claim
                </button>
              )}
              <ShowSelect
                showSelect={
                  session.slot === "Morning"
                    ? showSelectMorning
                    : showSelectEvening
                }
                sessionId={session.id}
                setShowSelectMorning={setShowSelectMorning}
                setShowSelectEvening={setShowSelectEvening}
                doShowModal={doShowModal}
                showModal={showModal}
                doHideModal={doHideModal}
                slotId={slotId}
                sessionDate={session.date}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Sessions;
